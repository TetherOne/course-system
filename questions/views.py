from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.viewsets import ModelViewSet

from questions.models import Answer, Question, QuestionFile
from questions.permissions import IsStudentEnrollment, IsTeacherOwner
from questions.serializers import (
    AnswerSerializer,
    QuestionSerializer,
    QuestionFileSerializer,
)


class QuestionFileViewSet(ModelViewSet):

    queryset = QuestionFile.objects.all()
    serializer_class = QuestionFileSerializer


class QuestionViewSet(ModelViewSet):

    queryset = Question.objects.prefetch_related(
        "checkpoint",
        "question_file",
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
