from django.db import models

class Bus(models.Model):

    BUS_TYPE = [
        ("SEATER", "Seater"),
        ("SLEEPER", "Sleeper"),
        ("SEATER_SLEEPER", "Seater & Sleeper"),
    ]

    AC_TYPE = [
        ("AC", "AC"),
        ("NON_AC", "Non AC"),
    ]

    bus_number = models.CharField(max_length=20, unique=True)
    bus_name = models.CharField(max_length=100)

    bus_type = models.CharField(max_length=20, choices=BUS_TYPE)
    ac_type = models.CharField(max_length=10, choices=AC_TYPE)

    total_seats = models.PositiveIntegerField()
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.bus_name} ({self.bus_number})"

class Seat(models.Model):

    DECK_CHOICES = [
        ("LOWER", "Lower"),
        ("UPPER", "Upper"),
    ]

    SEAT_TYPE_CHOICES = [
        ("SEATER", "Seater"),
        ("SLEEPER", "Sleeper"),
    ]

    POSITION_CHOICES = [
        ("WINDOW", "Window"),
        ("AISLE", "Aisle"),
    ]

    bus = models.ForeignKey(Bus, on_delete=models.CASCADE, related_name="seats")
    seat_number = models.CharField(max_length=10)
    deck = models.CharField(max_length=10, choices=DECK_CHOICES, default="LOWER")
    seat_type = models.CharField(max_length=10, choices=SEAT_TYPE_CHOICES)
    position = models.CharField(max_length=10, choices=POSITION_CHOICES)
    is_active = models.BooleanField(default=True)

    class Meta:
        unique_together = ("bus", "seat_number")

    def __str__(self):
        return f"{self.bus.bus_number} - {self.seat_number}"
    
def generate_seats_for_bus(bus):

    if bus.seats.exists():
        return 

    seat_count = bus.total_seats

    if bus.bus_type == "SLEEPER":
        seat_type = "SLEEPER"
    elif bus.bus_type == "SEATER":
        seat_type = "SEATER"
    else:  
        seat_type = None 

    seats_to_create = []

    for i in range(1, seat_count + 1):
       
        position = "WINDOW" if i % 2 == 1 else "AISLE"
        
        if seat_type is None:
            current_type = "SLEEPER" if i <= seat_count // 2 else "SEATER"
        else:
            current_type = seat_type

        deck = "LOWER" if i <= (seat_count // 2 or seat_count) else "UPPER"

        seats_to_create.append(
            Seat(
                bus=bus,
                seat_number=f"S{i}",
                deck=deck,
                seat_type=current_type,
                position=position,
            )
        )

    Seat.objects.bulk_create(seats_to_create)