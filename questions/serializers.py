from rest_framework import serializers

from questions.models import Answer, Question, QuestionFile, AnswerFile


class QuestionFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionFile
        fields = ("id", "question", "question_file")


class AnswerFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerFile
        fields = ("id", "answer", "answer_file")


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = (
            "id",
            "answer_text",
            "is_correct",
            "question",
        )

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        user = self.context["request"].user

        if (
            hasattr(
                user,
                "student_profile",
            )
            and not user.student_profile.is_teacher
        ):
            representation.pop("is_correct")

        return representation


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
