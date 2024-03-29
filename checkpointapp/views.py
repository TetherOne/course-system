from checkpointapp.serializers import PassedCheckPointSerializer
from checkpointapp.serializers import CheckPointSerializer
from checkpointapp.serializers import SummarySerializer

from django_filters.rest_framework import DjangoFilterBackend

from rest_framework.viewsets import ModelViewSet

from checkpointapp.models import PassedCheckPoint
from checkpointapp.models import CheckPoint
from checkpointapp.models import Summary


class CheckPointViewSet(ModelViewSet):

    queryset = CheckPoint.objects.prefetch_related("questions")
    serializer_class = CheckPointSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["module"]


class PassedCheckPointViewSet(ModelViewSet):

    queryset = PassedCheckPoint.objects.all()
    serializer_class = PassedCheckPointSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["checkpoint", "student"]
    ordering_fields = ["created_at"]


class SummaryViewSet(ModelViewSet):

    queryset = Summary.objects.all()
    serializer_class = SummarySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["student", "course"]
