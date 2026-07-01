from django.db import models


class Bus(models.Model):
    BUS_TYPES = [
        ("AC", "AC"),
        ("NON_AC", "Non AC"),
        ("SLEEPER", "Sleeper"),
        ("SEATER", "Seater"),
    ]

    bus_number = models.CharField(max_length=20, unique=True)
    bus_name = models.CharField(max_length=100)
    bus_type = models.CharField(max_length=20, choices=BUS_TYPES)
    total_seats = models.PositiveIntegerField()
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.bus_name} ({self.bus_number})"
