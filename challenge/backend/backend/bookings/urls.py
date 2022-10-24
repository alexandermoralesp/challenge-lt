from django.urls import path, include

from .api.routing import router

app_name = "bookings"

urlpatterns = [path("", include(router.urls))]
