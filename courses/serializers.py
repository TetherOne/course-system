from rest_framework import serializers

from .models import Course, Enrollment, Lesson, LessonOtherFile, Module


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
        fields = (
            "id", "course_name", "description", "status", "created_at", "teacher_profile", "image", "course_password",)

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        request = self.context.get('request')
        if request:
            current_user = request.user
            if instance.teacher_profile.user_id != current_user.id:
                representation.pop('course_password')

        return representation


class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = (
            "id",
            "name",
            "course",
            "status",
            "created_at",
        )


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = (
            "id",
            "name",
            "description",
            "module",
            "video",
            "status",
            "created_at",
        )


class LessonOtherFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonOtherFile
        fields = (
            "id",
            "lesson",
            "other_file",
        )
