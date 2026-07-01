from rest_framework.routers import DefaultRouter
from .views import BusViewSet

router = DefaultRouter()
router.register(r"buses", BusViewSet, basename="buses")

urlpatterns = router.urls