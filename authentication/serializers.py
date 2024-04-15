from django.contrib.auth.models import AnonymousUser

from profiles.serializers import TeacherSerializer
from profiles.serializers import StudentSerializer

from django.contrib.auth import get_user_model

from profiles.models import TeacherProfile
from profiles.models import StudentProfile

from rest_framework import serializers


class CurrentUserSerializer(serializers.ModelSerializer):
    user_profile = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = [
            "id",
            "username",
            "email",
            "date_joined",
            "user_profile",
        ]

    def get_user_profile(self, obj):
        """
        Получение профиля для текущего
        аутентифицированного пользователя
        """
        try:
            teacher_profile = obj.teacher_profile
            serializer = TeacherSerializer(teacher_profile)
        except TeacherProfile.DoesNotExist:
            try:
                student_profile = obj.student_profile
                serializer = StudentSerializer(student_profile)
            except StudentProfile.DoesNotExist:
                return None
        return serializer.data

    def to_representation(self, instance):
        if isinstance(instance, AnonymousUser):
            return {
                "id": None,
                "username": None,
                "email": None,
                "date_joined": None,
                "user_profile": None,
            }
        return super().to_representation(instance)