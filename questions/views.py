from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.viewsets import ModelViewSet

from questions.models import Answer, Question
from questions.permissions import IsStudentEnrollment, IsTeacherOwner
from questions.serializers import AnswerSerializer, QuestionSerializer


class QuestionViewSet(ModelViewSet):

    queryset = Question.objects.prefetch_related(
        "checkpoint",
    ).all()
    serializer_class = QuestionSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["checkpoint"]
    permission_classes = [IsTeacherOwner | IsStudentEnrollment]


class AnswerViewSet(ModelViewSet):

    queryset = Answer.objects.prefetch_related(
        "question",
    ).all()
    serializer_class = AnswerSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["question"]
    permission_classes = [IsTeacherOwner | IsStudentEnrollment]
