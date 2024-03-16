from checkpointapp.views import PassedCheckPointViewSet
from checkpointapp.views import CheckPointViewSet
from checkpointapp.views import QuestionViewSet
from checkpointapp.views import AnswerViewSet

from rest_framework.routers import DefaultRouter

from django.urls import include
from django.urls import path


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