from rest_framework import serializers

from checkpoints.models import CheckPoint, PassedCheckPoint, Summary
from questions.serializers import QuestionSerializer


class CheckPointSerializer(serializers.ModelSerializer):

    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = CheckPoint
        fields = (
            "id",
            "questions",
            "checkpoint_number",
            "name",
            "created_at",
            "module",
        )


class PassedCheckPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = PassedCheckPoint
        fields = (
            "id",
            "student",
            "checkpoint",
            "points",
            "percent",
            "status",
            "grade",
            "created_at",
        )


class SummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Summary
        fields = (
            "id",
            "student",
            "course",
            "current_points",
            "total",
            "grade",
            "created_at",
        )
