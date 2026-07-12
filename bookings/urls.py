from rest_framework.routers import DefaultRouter
from .views import BookingViewSet,SeatHoldViewSet

router = DefaultRouter()
router.register(r"bookings", BookingViewSet, basename="bookings")
router.register(r"seat-holds", SeatHoldViewSet, basename="seat-holds")
urlpatterns = router.urls