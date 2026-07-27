from rest_framework import serializers
from .models import Trip
from buses.serializers import BusSerializer
from routes.serializers import RouteSerializer


class TripSerializer(serializers.ModelSerializer):
    bus_detail = BusSerializer(source="bus", read_only=True)
    route_detail = RouteSerializer(source="route", read_only=True)

    class Meta:
        model = Trip
        fields = "__all__"