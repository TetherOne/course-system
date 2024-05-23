from rest_framework import serializers

from questions.models import Answer, Question, QuestionFile


class QuestionFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionFile
        fields = ("id", "question", "question_file")


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        exclude = ("is_correct",)


class QuestionSerializer(serializers.ModelSerializer):

    answers = AnswerSerializer(
        many=True,
        read_only=True,
    )
    question_files = QuestionFileSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = Question
        fields = "__all__"
