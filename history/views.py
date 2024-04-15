from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.viewsets import ModelViewSet

from history.models import HistoryOfPassedAnswer
from history.serializers import HistoryOfPassedAnswerSerializer


class HistoryOfPassedAnswerViewSet(ModelViewSet):

    queryset = HistoryOfPassedAnswer.objects.prefetch_related(
        "student",
        "checkpoint",
        "question",
    ).all()
    serializer_class = HistoryOfPassedAnswerSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        "student",
        "checkpoint",
        "question",
    ]

