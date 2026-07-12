from django.db import models
from django.contrib.auth import get_user_model
from trips.models import Trip
from buses.models import Seat
from routes.models import RouteStop
from django.utils.timezone import now
from datetime import timedelta
from django.utils import timezone
import uuid

User = get_user_model()


class Booking(models.Model):

    BOOKING_STATUS = [
        ("BOOKED", "Booked"),
        ("CANCELLED", "Cancelled"),
    ]

    PAYMENT_STATUS = [
        ("PENDING", "Pending"),
        ("SUCCESS", "Success"),
        ("FAILED", "Failed"),
    ]

    booking_reference = models.CharField(max_length=30, unique=True, blank=True)

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name="bookings")
    seat = models.ForeignKey(Seat, on_delete=models.CASCADE, related_name="bookings")

    boarding_stop = models.ForeignKey(
        RouteStop, on_delete=models.CASCADE, related_name="boarding_bookings"
    )
    dropping_stop = models.ForeignKey(
        RouteStop, on_delete=models.CASCADE, related_name="dropping_bookings"
    )

    fare_paid = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    booking_status = models.CharField(
        max_length=20,
        choices=BOOKING_STATUS,
        default="BOOKED",
    )

    payment_status = models.CharField(
        max_length=20,
        choices=PAYMENT_STATUS,
        default="PENDING",
    )

    booking_date = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.booking_reference:
            unique_suffix = uuid.uuid4().hex[:6].upper()
            self.booking_reference = f"SB{now().strftime('%Y%m%d%H%M%S')}{unique_suffix}"
        super().save(*args, **kwargs)


class SeatHold(models.Model):

    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name="seat_holds")
    seat = models.ForeignKey(Seat, on_delete=models.CASCADE, related_name="seat_holds")

    boarding_stop = models.ForeignKey(
        RouteStop, on_delete=models.CASCADE, related_name="boarding_holds"
    )
    dropping_stop = models.ForeignKey(
        RouteStop, on_delete=models.CASCADE, related_name="dropping_holds"
    )

    held_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="seat_holds")
    expires_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.expires_at:
            self.expires_at = timezone.now() + timedelta(minutes=7)
        super().save(*args, **kwargs)

    def is_expired(self):
        return timezone.now() > self.expires_at

    def __str__(self):
        return f"Hold: {self.seat} on trip {self.trip_id} by {self.held_by}"