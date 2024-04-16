from checkpoints.views import PassedCheckPointViewSet
from checkpoints.views import CheckPointViewSet
from checkpoints.views import SummaryViewSet

from rest_framework.routers import DefaultRouter

from django.urls import include
from django.urls import path


app_name = "checkpoints"


routers = DefaultRouter()


routers.register(
    "checkpoints",
    CheckPointViewSet,
    basename="checkpoints",
)
routers.register(
    "summaries",
    SummaryViewSet,
    basename="summaries",
)
routers.register(
    "passed-checkpoints",
    PassedCheckPointViewSet,
    basename="passed-checkpoints",
)


urlpatterns = [
    path("", include(routers.urls)),
]
