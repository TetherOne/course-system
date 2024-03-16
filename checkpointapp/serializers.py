from rest_framework import serializers

from checkpointapp.models import Answer, Question, CheckPoint, PassedCheckPoint


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