from rest_framework import serializers
from .models import Trip


class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = "__all__"

    def validate(self, data):
        departure = data.get("departure_time")
        arrival = data.get("arrival_time")
        seats = data.get("available_seats")

        if departure and arrival and arrival <= departure:
            raise serializers.ValidationError(
                "Arrival time must be after departure time"
            )

        if seats and seats <= 0:
            raise serializers.ValidationError(
                "Available seats must be greater than 0"
            )

        return data