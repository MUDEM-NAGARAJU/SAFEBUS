from rest_framework import serializers
from .models import Booking

class BookingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Booking
        fields = "__all__"
        read_only_fields = ["user", "booking_reference"]

    def validate(self, data):
        trip = data["trip"]
        seat_number = data["seat_number"]

        if seat_number <= 0:
            raise serializers.ValidationError("Invalid seat number")

        if seat_number > trip.bus.total_seats:
            raise serializers.ValidationError("Seat number exceeds bus capacity")

        return data
