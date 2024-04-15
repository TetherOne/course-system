from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.viewsets import ModelViewSet

from questions.serializers import QuestionSerializer
from questions.serializers import AnswerSerializer

from questions.models import Question
from questions.models import Answer


class QuestionViewSet(ModelViewSet):

    queryset = Question.objects.prefetch_related("answers")
    serializer_class = QuestionSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["checkpoint"]


class AnswerViewSet(ModelViewSet):

    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["question"]
