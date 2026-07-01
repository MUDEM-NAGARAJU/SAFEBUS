from django.db.models import Q
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend

from .models import Trip
from .serializers import TripSerializer


class TripViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.select_related("bus", "route").all().order_by("-travel_date")
    serializer_class = TripSerializer

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    # OPTIONAL: simple search (bus name / route text search)
    search_fields = [
        "bus__bus_name",
        "route__source",
        "route__destination",
    ]

    ordering_fields = [
        "travel_date",
        "price",
        "available_seats",
    ]

    filterset_fields = [
        "status",
        "travel_date",
        "bus",
        "route",
    ]

    # CUSTOM SEARCH (IMPORTANT for your UI: from, to, date)
    def get_queryset(self):
        qs = super().get_queryset()

        from_loc = self.request.query_params.get("from")
        to_loc = self.request.query_params.get("to")
        date = self.request.query_params.get("date")

        if from_loc and to_loc:
            qs = qs.filter(
                Q(route__source__icontains=from_loc) &
                Q(route__destination__icontains=to_loc)
            )

        if date:
            qs = qs.filter(travel_date=date)

        return qs
