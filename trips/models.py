from django.db import models
from buses.models import Bus
from routes.models import Route


class Trip(models.Model):

    TRIP_STATUS = [
        ("SCHEDULED", "Scheduled"),
        ("COMPLETED", "Completed"),
        ("CANCELLED", "Cancelled"),
    ]

    bus = models.ForeignKey(Bus, on_delete=models.CASCADE)
    route = models.ForeignKey(Route, on_delete=models.CASCADE)

    travel_date = models.DateField()
    departure_time = models.TimeField()

    status = models.CharField(
        max_length=20,
        choices=TRIP_STATUS,
        default="SCHEDULED"
    )

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return (
            f"{self.route.source} → "
            f"{self.route.destination} | "
            f"{self.travel_date}"
        )