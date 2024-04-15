from cheackpoints.serializers import PassedCheckPointSerializer
from cheackpoints.serializers import CheckPointSerializer
from cheackpoints.serializers import SummarySerializer

from django_filters.rest_framework import DjangoFilterBackend

from rest_framework.viewsets import ModelViewSet

from cheackpoints.models import PassedCheckPoint
from cheackpoints.models import CheckPoint
from cheackpoints.models import Summary


class CheckPointViewSet(ModelViewSet):

    queryset = CheckPoint.objects.prefetch_related(
        "questions",
        "module",
    ).all()
    serializer_class = CheckPointSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["module"]


class PassedCheckPointViewSet(ModelViewSet):

    queryset = PassedCheckPoint.objects.prefetch_related(
        "checkpoint",
        "student",
    ).all()
    serializer_class = PassedCheckPointSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        "checkpoint",
        "student",
    ]
    ordering_fields = ["created_at"]


class SummaryViewSet(ModelViewSet):

    queryset = Summary.objects.prefetch_related(
        "student",
        "course",
    ).all()
    serializer_class = SummarySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        "student",
        "course",
    ]
