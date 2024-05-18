from django.urls import include, path
from rest_framework.routers import DefaultRouter

from checkpoints.views import CheckPointViewSet, PassedCheckPointViewSet, SummaryViewSet


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
