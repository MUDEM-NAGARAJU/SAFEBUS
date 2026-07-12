from rest_framework import serializers
from .models import Booking, SeatHold

class BookingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Booking
        fields = "__all__"
        read_only_fields = ["user", "booking_reference", "fare_paid"]

    def validate(self, data):
        boarding_stop = data["boarding_stop"]
        dropping_stop = data["dropping_stop"]

        if boarding_stop.route_id != dropping_stop.route_id:
            raise serializers.ValidationError(
                "Boarding and dropping stops must belong to the same route"
            )

        if boarding_stop.sequence >= dropping_stop.sequence:
            raise serializers.ValidationError(
                "Dropping stop must come after boarding stop"
            )

        return data
    
class SeatHoldSerializer(serializers.ModelSerializer):

    class Meta:
        model = SeatHold
        fields = "__all__"
        read_only_fields = ["held_by", "expires_at"]

    def validate(self, data):
        boarding_stop = data["boarding_stop"]
        dropping_stop = data["dropping_stop"]

        if boarding_stop.route_id != dropping_stop.route_id:
            raise serializers.ValidationError(
                "Boarding and dropping stops must belong to the same route"
            )

        if boarding_stop.sequence >= dropping_stop.sequence:
            raise serializers.ValidationError(
                "Dropping stop must come after boarding stop"
            )

        return data
