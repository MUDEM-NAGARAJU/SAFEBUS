from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from django.db import transaction

from .models import Booking
from .serializers import BookingSerializer
from trips.models import Trip


class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # IMPORTANT: users should only see their own bookings
        return Booking.objects.filter(user=self.request.user).order_by("-id")

    def perform_create(self, serializer):
        with transaction.atomic():

            trip = serializer.validated_data["trip"]
            seat_number = serializer.validated_data["seat_number"]

            # lock trip row
            trip = Trip.objects.select_for_update().get(id=trip.id)

            # check seat already booked
            if Booking.objects.filter(trip=trip, seat_number=seat_number).exists():
                raise ValidationError("Seat already booked")

            if trip.available_seats <= 0:
                raise ValidationError("No seats available")

            # create booking
            booking = serializer.save(user=self.request.user)

            # reduce seat count
            trip.available_seats -= 1
            trip.save()