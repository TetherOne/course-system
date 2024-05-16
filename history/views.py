from history.permissions import IsTeacherOrStudent
from history.serializers import HistoryOfSelectedAnswerSerializer

from django_filters.rest_framework import DjangoFilterBackend

from rest_framework.permissions import IsAdminUser

from rest_framework.viewsets import ModelViewSet

from history.models import HistoryOfSelectedAnswer


class HistoryOfSelectedAnswerViewSet(ModelViewSet):

    queryset = HistoryOfSelectedAnswer.objects.prefetch_related(
        "student",
        "checkpoint",
        "question",
        "selected_answer",
    ).all()
    serializer_class = HistoryOfSelectedAnswerSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        "student",
        "checkpoint",
        "question",
        "selected_answer",
    ]
    permission_classes = [IsTeacherOrStudent]
