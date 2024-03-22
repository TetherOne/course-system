from checkpointapp.serializers import PassedCheckPointSerializer
from checkpointapp.serializers import CheckPointSerializer
from checkpointapp.serializers import QuestionSerializer
from checkpointapp.serializers import AnswerSerializer

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.viewsets import ModelViewSet

from checkpointapp.models import PassedCheckPoint
from checkpointapp.models import CheckPoint
from checkpointapp.models import Question
from checkpointapp.models import Answer


class CheckPointViewSet(ModelViewSet):

    queryset = CheckPoint.objects.prefetch_related("questions__answers").all()
    serializer_class = CheckPointSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["module"]


class QuestionViewSet(ModelViewSet):

    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["checkpoint"]


class AnswerViewSet(ModelViewSet):

    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["question"]


class PassedCheckPointViewSet(ModelViewSet):

    queryset = PassedCheckPoint.objects.all()
    serializer_class = PassedCheckPointSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["checkpoint", "student"]
    ordering_fields = ["created_at"]
