from django.db import models

class Bus(models.Model):

    BUS_TYPE = [
        ("SEATER", "Seater"),
        ("SLEEPER", "Sleeper"),
        ("SEATER_SLEEPER", "Seater & Sleeper"),
    ]

    AC_TYPE = [
        ("AC", "AC"),
        ("NON_AC", "Non AC"),
    ]

    bus_number = models.CharField(max_length=20, unique=True)
    bus_name = models.CharField(max_length=100)

    bus_type = models.CharField(max_length=20, choices=BUS_TYPE)
    ac_type = models.CharField(max_length=10, choices=AC_TYPE)

    total_seats = models.PositiveIntegerField()
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.bus_name} ({self.bus_number})"
