from rest_framework.routers import DefaultRouter

from .viewsets import (
    BookingViewSet,
)


router = DefaultRouter()
router.register("", BookingViewSet, basename='booking')
