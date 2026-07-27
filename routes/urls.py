from rest_framework.routers import DefaultRouter
from .views import RouteViewSet, RouteStopViewSet, StopFareViewSet

router = DefaultRouter()
router.register(r"routes", RouteViewSet, basename="routes")
router.register(r"route-stops", RouteStopViewSet, basename="route-stops")
router.register(r"stop-fares", StopFareViewSet, basename="stop-fares")

urlpatterns = router.urls