from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from django.db import transaction
from django.utils import timezone
from .models import Booking, SeatHold
from .serializers import BookingSerializer, SeatHoldSerializer
from trips.models import Trip
from rest_framework.decorators import action
from rest_framework.response import Response

def is_seat_available(trip, seat, boarding_stop, dropping_stop, exclude_hold_id=None):
    req_start = boarding_stop.sequence
    req_end = dropping_stop.sequence

    overlapping_booking = Booking.objects.filter(
        trip=trip,
        seat=seat,
        booking_status="BOOKED",
        boarding_stop__sequence__lt=req_end,
        dropping_stop__sequence__gt=req_start,
    ).exists()

    if overlapping_booking:
        return False

    holds_qs = SeatHold.objects.filter(
        trip=trip,
        seat=seat,
        expires_at__gt=timezone.now(),
        boarding_stop__sequence__lt=req_end,
        dropping_stop__sequence__gt=req_start,
    )

    if exclude_hold_id:
        holds_qs = holds_qs.exclude(id=exclude_hold_id)

    if holds_qs.exists():
        return False

    return True


class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user).order_by("-id")

    def perform_create(self, serializer):
        with transaction.atomic():

            trip = serializer.validated_data["trip"]
            seat = serializer.validated_data["seat"]
            boarding_stop = serializer.validated_data["boarding_stop"]
            dropping_stop = serializer.validated_data["dropping_stop"]

            trip = Trip.objects.select_for_update().get(id=trip.id)

            if not is_seat_available(trip, seat, boarding_stop, dropping_stop):
                raise ValidationError("Seat not available for this segment")

            seat_type = seat.seat_type
            if seat_type == "SLEEPER":
                fare = dropping_stop.fare.sleeper_fare - boarding_stop.fare.sleeper_fare
            else:
                fare = dropping_stop.fare.seater_fare - boarding_stop.fare.seater_fare

            serializer.save(user=self.request.user, fare_paid=fare)

class SeatHoldViewSet(viewsets.ModelViewSet):
    serializer_class = SeatHoldSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return SeatHold.objects.filter(held_by=self.request.user).order_by("-id")

    def perform_create(self, serializer):
        with transaction.atomic():

            trip = serializer.validated_data["trip"]
            seat = serializer.validated_data["seat"]
            boarding_stop = serializer.validated_data["boarding_stop"]
            dropping_stop = serializer.validated_data["dropping_stop"]

            trip = Trip.objects.select_for_update().get(id=trip.id)

            if not is_seat_available(trip, seat, boarding_stop, dropping_stop):
                raise ValidationError("Seat not available for this segment")

            serializer.save(held_by=self.request.user)

    @action(detail=False, methods=["post"], url_path="confirm-bulk")
    def confirm_bulk(self, request):
        hold_ids = request.data.get("hold_ids", [])

        if not hold_ids:
            raise ValidationError("hold_ids list is required")

        with transaction.atomic():

            holds = list(
                SeatHold.objects
                .select_for_update()
                .filter(id__in=hold_ids, held_by=request.user)
            )

            if len(holds) != len(hold_ids):
                raise ValidationError("One or more holds not found or don't belong to you")

            trip_ids = set(h.trip_id for h in holds)
            if len(trip_ids) != 1:
                raise ValidationError("All selected seats must belong to the same trip")

            bookings_created = []

            for hold in holds:
                if hold.is_expired():
                    raise ValidationError(f"Hold on seat {hold.seat.seat_number} has expired. Please reselect.")

                if not is_seat_available(
                    hold.trip, hold.seat, hold.boarding_stop, hold.dropping_stop,
                    exclude_hold_id=hold.id
                ):
                    raise ValidationError(f"Seat {hold.seat.seat_number} is no longer available")

                seat_type = hold.seat.seat_type
                if seat_type == "SLEEPER":
                    fare = hold.dropping_stop.fare.sleeper_fare - hold.boarding_stop.fare.sleeper_fare
                else:
                    fare = hold.dropping_stop.fare.seater_fare - hold.boarding_stop.fare.seater_fare

                booking = Booking.objects.create(
                    user=request.user,
                    trip=hold.trip,
                    seat=hold.seat,
                    boarding_stop=hold.boarding_stop,
                    dropping_stop=hold.dropping_stop,
                    fare_paid=fare,
                    booking_status="BOOKED",
                    payment_status="SUCCESS", 
                )
                bookings_created.append(booking)


            for hold in holds:
                hold.delete()

            trip = bookings_created[0].trip
            total_fare = sum(b.fare_paid for b in bookings_created)

            ticket = {
                "booking_references": [b.booking_reference for b in bookings_created],
                "bus_name": trip.bus.bus_name,
                "bus_number": trip.bus.bus_number,
                "bus_type": trip.bus.bus_type,
                "ac_type": trip.bus.ac_type,
                "travel_date": trip.travel_date,
                "departure_time": trip.departure_time,
                "boarding_stop": bookings_created[0].boarding_stop.stop_name,
                "dropping_stop": bookings_created[0].dropping_stop.stop_name,
                "seats": [
                    {"seat_number": b.seat.seat_number, "fare": b.fare_paid}
                    for b in bookings_created
                ],
                "total_fare": total_fare,
                "payment_status": "SUCCESS",
            }

            return Response(ticket)