from rest_framework.routers import DefaultRouter

from django.urls import include
from django.urls import path

from questionapp.views import QuestionViewSet, AnswerViewSet

app_name = "questionapp"


routers = DefaultRouter()


routers.register(
    "questions",
    QuestionViewSet,
    basename="questions",
)
routers.register(
    "answers",
    AnswerViewSet,
    basename="answers",
)


urlpatterns = [
    path("", include(routers.urls)),
]
