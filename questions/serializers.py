from questions.models import Question
from questions.models import Answer

from rest_framework import serializers


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = "__all__"

class QuestionSerializer(serializers.ModelSerializer):

    answers = AnswerSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = Question
        fields = "__all__"
