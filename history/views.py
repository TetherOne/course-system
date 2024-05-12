from history.serializers import HistoryOfSelectedAnswerSerializer

from django_filters.rest_framework import DjangoFilterBackend

from rest_framework.permissions import IsAdminUser

from rest_framework.viewsets import ModelViewSet

from history.models import HistoryOfSelectedAnswer


class PermissionViewSet(ModelViewSet):

    permission_classes_by_action = {
        "update": [IsAdminUser],
        "partial_update": [IsAdminUser],
        "destroy": [IsAdminUser],
    }

    def get_permissions(self) -> list:
        return [
            permission()
            for permission in self.permission_classes_by_action.get(
                self.action,
                [],
            )
        ]


class HistoryOfSelectedAnswerViewSet(PermissionViewSet, ModelViewSet):

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
