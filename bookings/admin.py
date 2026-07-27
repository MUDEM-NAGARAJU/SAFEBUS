from django.contrib import admin
from .models import Booking, SeatHold


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ("id", "booking_reference", "user", "trip", "seat", "booking_status", "payment_status", "fare_paid")
    list_filter = ("booking_status", "payment_status")
    search_fields = ("booking_reference", "user__username")


@admin.register(SeatHold)
class SeatHoldAdmin(admin.ModelAdmin):
    list_display = ("id", "trip", "seat", "held_by", "expires_at")