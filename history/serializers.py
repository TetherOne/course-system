from rest_framework import serializers

from history.models import HistoryOfSelectedAnswer


class HistoryOfSelectedAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoryOfSelectedAnswer
        fields = (
            "id",
            "student",
            "checkpoint",
            "question",
            "selected_answer",
            "is_correct",
            "points",
        )
