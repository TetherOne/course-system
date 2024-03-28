from checkpointapp.views import PassedCheckPointViewSet
from checkpointapp.views import CheckPointViewSet

from rest_framework.routers import DefaultRouter

from django.urls import include
from django.urls import path


app_name = "checkpointapp"


routers = DefaultRouter()


routers.register(
    "checkpoints",
    CheckPointViewSet,
    basename="checkpoints",
)
routers.register(
    "passed-checkpoints",
    PassedCheckPointViewSet,
    basename="passed-checkpoints",
)


urlpatterns = [
    path("", include(routers.urls)),
]
