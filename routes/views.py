from rest_framework import viewsets
from .models import Route,RouteStop,StopFare
from .serializers import RouteSerializer,RouteStopSerializer,StopFareSerializer
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from common.permissions import IsStaffOrReadOnly

class RouteViewSet(viewsets.ModelViewSet):
    permission_classes = [IsStaffOrReadOnly]
    queryset = Route.objects.all().order_by("-id")
    serializer_class = RouteSerializer

    search_fields = ["source", "destination"]
    ordering_fields = ["fare", "distance", "created_at"]
    filterset_fields = ["is_active"]

class RouteStopViewSet(viewsets.ModelViewSet):
    permission_classes = [IsStaffOrReadOnly]
    queryset = RouteStop.objects.all().order_by("route", "sequence")
    serializer_class = RouteStopSerializer
    filterset_fields = ["route"]
    search_fields = ["stop_name"]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]

class StopFareViewSet(viewsets.ModelViewSet):
    permission_classes = [IsStaffOrReadOnly]
    queryset = StopFare.objects.all()
    serializer_class = StopFareSerializer
    filterset_fields = ["route_stop"]