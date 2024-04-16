from history.serializers import HistoryOfPassedAnswerSerializer

from django_filters.rest_framework import DjangoFilterBackend

from history.models import HistoryOfPassedAnswer

from rest_framework.viewsets import ModelViewSet


class HistoryOfPassedAnswerViewSet(ModelViewSet):

    queryset = HistoryOfPassedAnswer.objects.prefetch_related(
        "student",
        "checkpoint",
        "question",
        "selected_answer",
    ).all()
    serializer_class = HistoryOfPassedAnswerSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        "student",
        "checkpoint",
        "question",
        "selected_answer",
    ]

