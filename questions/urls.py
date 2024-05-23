from django.urls import include, path
from rest_framework.routers import DefaultRouter

from questions.views import AnswerViewSet, QuestionViewSet, QuestionFileViewSet

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

urlpatterns = [
    path("", include(routers.urls)),
]
