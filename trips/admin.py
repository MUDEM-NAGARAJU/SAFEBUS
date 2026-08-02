
from django.contrib import admin
from .models import Trip


@admin.register(Trip)
class TripAdmin(admin.ModelAdmin):
    list_display = ("id", "bus", "route", "travel_date", "departure_time", "status")
    list_filter = ("status", "travel_date")
    search_fields = ("bus__bus_name", "route__source", "route__destination")