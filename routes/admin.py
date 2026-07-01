from django.contrib import admin
from .models import Route


@admin.register(Route)
class RouteAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "source",
        "destination",
        "distance",
        "estimated_duration",
        "fare",
        "is_active",
    )

    search_fields = (
        "source",
        "destination",
    )

    list_filter = (
        "is_active",
    )
# Register your models here.
