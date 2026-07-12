from django.contrib import admin
from .models import Route, RouteStop, StopFare


@admin.register(Route)
class RouteAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "source",
        "destination",
        "distance",
        "estimated_duration",
        "is_active",
    )

    search_fields = (
        "source",
        "destination",
    )

    list_filter = (
        "is_active",
    )


@admin.register(RouteStop)
class RouteStopAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "route",
        "sequence",
        "stop_name",
        "distance_from_origin_km",
        "arrival_offset_minutes",
    )

    list_filter = ("route",)
    ordering = ("route", "sequence")


@admin.register(StopFare)
class StopFareAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "route_stop",
        "seater_fare",
        "sleeper_fare",
    )