from checkpointapp.models import PassedCheckPoint
from checkpointapp.models import CheckPoint
from checkpointapp.models import Question
from checkpointapp.models import Answer

from rest_framework import serializers


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = "__all__"


class QuestionSerializer(serializers.ModelSerializer):

    answers = AnswerSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = "__all__"


class CheckPointSerializer(serializers.ModelSerializer):

    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = CheckPoint
        fields = "__all__"


class PassedCheckPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = PassedCheckPoint
        fields = "__all__"