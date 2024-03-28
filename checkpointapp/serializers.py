from checkpointapp.models import PassedCheckPoint
from checkpointapp.models import CheckPoint

from rest_framework import serializers

from questionapp.serializers import QuestionSerializer


class CheckPointSerializer(serializers.ModelSerializer):

    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = CheckPoint
        fields = "__all__"


class PassedCheckPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = PassedCheckPoint
        fields = "__all__"