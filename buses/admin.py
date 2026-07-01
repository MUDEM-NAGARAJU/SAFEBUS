from django.contrib import admin
from .models import Bus


@admin.register(Bus)
class BusAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "bus_number",
        "bus_name",
        "bus_type",
        "total_seats",
        "is_active",
    )

    search_fields = (
        "bus_number",
        "bus_name",
    )

    list_filter = (
        "bus_type",
        "is_active",
    )
# Register your models here.
