from django.db import models


class Route(models.Model):
    source = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    distance = models.PositiveIntegerField(help_text="Distance in KM")
    estimated_duration = models.DurationField(null=True, blank=True)
    fare = models.DecimalField(max_digits=10, decimal_places=2)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.source} → {self.destination}"

# Create your models here.
