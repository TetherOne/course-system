from checkpointapp.serializers import PassedCheckPointSerializer
from checkpointapp.serializers import CheckPointSerializer


from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.viewsets import ModelViewSet

from checkpointapp.models import PassedCheckPoint
from checkpointapp.models import CheckPoint


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
