from questions.serializers import QuestionSerializer

from cheackpoints.models import PassedCheckPoint
from cheackpoints.models import CheckPoint
from cheackpoints.models import Summary

from rest_framework import serializers


class CheckPointSerializer(serializers.ModelSerializer):

    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = CheckPoint
        fields = "__all__"


class PassedCheckPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = PassedCheckPoint
        fields = "__all__"


class SummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Summary
        fields = "__all__"
