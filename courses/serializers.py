from rest_framework import serializers

from .models import LessonOtherFile
from .models import Enrollment
from .models import Lesson
from .models import Course
from .models import Module


class EnrollmentSerializer(serializers.ModelSerializer):

    course_password = serializers.CharField(write_only=True)

    class Meta:
        model = Enrollment
        fields = "__all__"

    def validate(self, data):
        """
        Password verification
        """
        course = data["course"]
        course_password = data.get("course_password")
        if course.course_password != course_password:
            raise serializers.ValidationError(
                "Неверный пароль курса.",
            )
        return data

    def create(self, validated_data):
        """
        Removing a password when creating an
        entry in Enrollment
        """
        validated_data.pop("course_password")
        return super().create(validated_data)


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        exclude = "course_password",


class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = "__all__"


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = "__all__"


class LessonOtherFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonOtherFile
        fields = "__all__"
