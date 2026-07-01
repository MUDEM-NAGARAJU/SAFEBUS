from django.shortcuts import render
from rest_framework import viewsets
from .models import Trip
from .serializers import TripSerializer


class TripViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.all().order_by("-travel_date")
    serializer_class = TripSerializer

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

# Create your views here.
