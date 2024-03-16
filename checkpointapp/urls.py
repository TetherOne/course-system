from django.urls import path, include
from rest_framework.routers import DefaultRouter

from checkpointapp.views import CheckPointViewSet, QuestionViewSet, AnswerViewSet, PassedCheckPointViewSet


app_name = "checkpointapp"


routers = DefaultRouter()
routers.register(
    'checkpoints',
    CheckPointViewSet,
)
routers.register(
    "questions",
    QuestionViewSet,
)
routers.register(
    "answers",
    AnswerViewSet,
)
routers.register(
    "passed-checkpoints",
    PassedCheckPointViewSet,
)


urlpatterns = [
    path('', include(routers.urls)),
]