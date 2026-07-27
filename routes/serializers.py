from rest_framework import serializers
from .models import Route,RouteStop,StopFare


class RouteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Route
        fields = "__all__"

    def validate_distance(self, value):
        if value <= 0:
            raise serializers.ValidationError("Distance must be greater than 0")
        return value

class RouteStopSerializer(serializers.ModelSerializer):
    class Meta:
        model = RouteStop
        fields = "__all__"

class StopFareSerializer(serializers.ModelSerializer):
    class Meta:
        model = StopFare
        fields = "__all__"