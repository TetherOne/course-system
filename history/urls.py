from django.urls import include, path
from rest_framework.routers import DefaultRouter

from history.views import HistoryOfSelectedAnswerViewSet


app_name = "history"


routers = DefaultRouter()


routers.register(
    "history-of-passed-answers",
    HistoryOfSelectedAnswerViewSet,
)


urlpatterns = [
    path("", include(routers.urls)),
]
