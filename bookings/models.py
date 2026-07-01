from django.db import models
from django.contrib.auth import get_user_model
from trips.models import Trip
from django.utils.timezone import now
import random

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

    booking_reference = models.CharField(max_length=20, unique=True, blank=True)

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)

    seat_number = models.PositiveIntegerField()

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
            self.booking_reference = f"SB{now().strftime('%Y%m%d%H%M%S')}{self.user_id}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.booking_reference} - {self.user.username}"
