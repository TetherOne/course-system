from django.urls import include, path
from rest_framework.routers import DefaultRouter

from questions.views import (
    AnswerFileViewSet,
    AnswerViewSet,
    QuestionFileViewSet,
    QuestionViewSet,
)


app_name = "questions"


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
routers.register(
    "question-files",
    QuestionFileViewSet,
)
routers.register(
    "answer-files",
    AnswerFileViewSet,
)


urlpatterns = [
    path("", include(routers.urls)),
]
