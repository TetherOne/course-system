from cheackpoints.views import PassedCheckPointViewSet
from cheackpoints.views import CheckPointViewSet
from cheackpoints.views import SummaryViewSet

from rest_framework.routers import DefaultRouter

from django.urls import include
from django.urls import path


app_name = "cheackpoints"


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
