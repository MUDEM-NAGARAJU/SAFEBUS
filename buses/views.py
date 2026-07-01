from rest_framework import viewsets

from .models import Bus
from .serializers import BusSerializer


class BusViewSet(viewsets.ModelViewSet):
    queryset = Bus.objects.all().order_by("id")
    serializer_class = BusSerializer

    search_fields = [
        "bus_name",
        "bus_number",
        "bus_type",
    ]

    ordering_fields = [
        "bus_name",
        "total_seats",
        "created_at",
    ]

    filterset_fields = [
        "bus_type",
        "is_active",
    ]
