from rest_framework import serializers
from .models import Route


class RouteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Route
        fields = "__all__"

    def validate_distance(self, value):
        if value <= 0:
            raise serializers.ValidationError("Distance must be greater than 0")
        return value
