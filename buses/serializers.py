from rest_framework import serializers
from .models import Bus


class BusSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bus
        fields = "__all__"

    def validate_total_seats(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Total seats must be greater than zero."
            )

        if value > 100:
            raise serializers.ValidationError(
                "A bus cannot have more than 100 seats."
            )

        return value

    def validate_bus_number(self, value):
        return value.upper()