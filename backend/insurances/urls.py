from rest_framework.routers import DefaultRouter

from .views import InsuranceViewSet

router = DefaultRouter()
router.register("insurances", InsuranceViewSet, basename="insurance")

urlpatterns = router.urls
