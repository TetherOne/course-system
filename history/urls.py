from history.views import HistoryOfPassedAnswerViewSet

from rest_framework.routers import DefaultRouter

from django.urls import include
from django.urls import path


app_name = "history"


routers = DefaultRouter()


routers.register(
    "history-of-passed-answers",
    HistoryOfPassedAnswerViewSet,
)


urlpatterns = [
    path("", include(routers.urls)),
]
