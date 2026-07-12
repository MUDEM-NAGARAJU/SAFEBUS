from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from django.db import transaction
from django.utils import timezone
from .models import Booking, SeatHold
from .serializers import BookingSerializer, SeatHoldSerializer
from trips.models import Trip


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