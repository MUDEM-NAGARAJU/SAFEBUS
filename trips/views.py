from django.db.models import Q
from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone

from .models import Trip
from .serializers import TripSerializer
from routes.models import RouteStop
from bookings.views import is_seat_available
from bookings.models import SeatHold


class TripViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.select_related("bus", "route").all().order_by("-travel_date")
    serializer_class = TripSerializer

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    search_fields = [
        "bus__bus_name",
        "route__source",
        "route__destination",
    ]

    ordering_fields = [
        "travel_date",
        "departure_time",
    ]

    filterset_fields = [
        "status",
        "travel_date",
        "bus",
        "route",
    ]

    def get_queryset(self):
        qs = super().get_queryset()

        from_loc = self.request.query_params.get("from")
        to_loc = self.request.query_params.get("to")
        date = self.request.query_params.get("date")

        if from_loc and to_loc:
            from_stops = RouteStop.objects.filter(stop_name__icontains=from_loc)
            valid_route_ids = []

            for from_stop in from_stops:
                has_valid_dropping = RouteStop.objects.filter(
                    route=from_stop.route,
                    stop_name__icontains=to_loc,
                    sequence__gt=from_stop.sequence,
                ).exists()

                if has_valid_dropping:
                    valid_route_ids.append(from_stop.route_id)

            qs = qs.filter(route_id__in=valid_route_ids)

        if date:
            qs = qs.filter(travel_date=date)

        return qs

    @action(detail=True, methods=["get"], url_path="seat-map")
    def seat_map(self, request, pk=None):
        trip = self.get_object()

        boarding_id = request.query_params.get("boarding_stop")
        dropping_id = request.query_params.get("dropping_stop")

        if not boarding_id or not dropping_id:
            raise ValidationError("boarding_stop and dropping_stop query params are required")

        boarding_stop = RouteStop.objects.get(id=boarding_id)
        dropping_stop = RouteStop.objects.get(id=dropping_id)

        if boarding_stop.sequence >= dropping_stop.sequence:
            raise ValidationError("Dropping stop must come after boarding stop")

        seater_fare = dropping_stop.fare.seater_fare - boarding_stop.fare.seater_fare
        sleeper_fare = dropping_stop.fare.sleeper_fare - boarding_stop.fare.sleeper_fare

        seats = trip.bus.seats.filter(is_active=True).order_by("seat_number")

        user = request.user if request.user.is_authenticated else None

        result = []
        for seat in seats:
            available = is_seat_available(trip, seat, boarding_stop, dropping_stop)

            if available:
                status_label = "available"
            else:
                is_own_hold = SeatHold.objects.filter(
                    trip=trip, seat=seat, held_by=user,
                    expires_at__gt=timezone.now(),
                    boarding_stop__sequence__lt=dropping_stop.sequence,
                    dropping_stop__sequence__gt=boarding_stop.sequence,
                ).exists() if user else False

                if is_own_hold:
                    status_label = "held_by_you"
                else:
                    status_label = "booked_or_held"

            fare = sleeper_fare if seat.seat_type == "SLEEPER" else seater_fare

            result.append({
                "seat_id": seat.id,
                "seat_number": seat.seat_number,
                "deck": seat.deck,
                "seat_type": seat.seat_type,
                "position": seat.position,
                "status": status_label,
                "fare": fare,
            })

        return Response({
            "trip_id": trip.id,
            "boarding_stop": boarding_stop.stop_name,
            "dropping_stop": dropping_stop.stop_name,
            "seats": result,
        })
