from django.db import models
    
class Route(models.Model):
    name = models.CharField(max_length=150, blank=True)
    source = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    distance = models.PositiveIntegerField(help_text="Distance in KM")
    estimated_duration = models.DurationField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.source} → {self.destination}"

class RouteStop(models.Model):

    route = models.ForeignKey(Route, on_delete=models.CASCADE, related_name="stops")
    stop_name = models.CharField(max_length=100)
    sequence = models.PositiveIntegerField()
    distance_from_origin_km = models.PositiveIntegerField(default=0)
    arrival_offset_minutes = models.PositiveIntegerField(
        default=0,
        help_text="Minutes from trip departure time"
    )

    class Meta:
        unique_together = ("route", "sequence")
        ordering = ["sequence"]

    def __str__(self):
        return f"{self.route} - Stop {self.sequence}: {self.stop_name}"
    
class StopFare(models.Model):

    route_stop = models.OneToOneField(
        RouteStop, on_delete=models.CASCADE, related_name="fare"
    )
    seater_fare = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    sleeper_fare = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return f"{self.route_stop} - Seater ₹{self.seater_fare} / Sleeper ₹{self.sleeper_fare}"