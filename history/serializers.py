from rest_framework import serializers

from history.models import HistoryOfPassedAnswer


class HistoryOfPassedAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoryOfPassedAnswer
        fields = (
            "id",
            "student",
            "checkpoint",
            "question",
            "selected_answer",
            "is_correct",
            "points",
        )
