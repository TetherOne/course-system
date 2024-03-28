from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.viewsets import ModelViewSet

from questionapp.serializers import QuestionSerializer
from questionapp.serializers import AnswerSerializer

from questionapp.models import Question
from questionapp.models import Answer


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