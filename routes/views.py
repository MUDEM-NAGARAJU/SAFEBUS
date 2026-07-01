from rest_framework import viewsets
from .models import Route
from .serializers import RouteSerializer


class RouteViewSet(viewsets.ModelViewSet):
    queryset = Route.objects.all().order_by("-id")
    serializer_class = RouteSerializer

    search_fields = ["source", "destination"]
    ordering_fields = ["fare", "distance", "created_at"]
    filterset_fields = ["is_active"]
