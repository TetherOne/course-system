from django.contrib.auth.models import User

from rest_framework import serializers

from userapp.models import TeacherProfile
from userapp.models import StudentProfile


class UserRegistrationSerializer(serializers.ModelSerializer):

    is_teacher = serializers.BooleanField(default=False)

    class Meta:
        model = User
        fields = "id", "email", "username", "password", "is_teacher"
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):

        is_teacher = validated_data.pop("is_teacher", False)
        user = User.objects.create_user(**validated_data)

        if is_teacher:
            TeacherProfile.objects.create(user=user)

        else:
            StudentProfile.objects.create(user=user)

        return user

    def to_representation(self, instance):

        data = super().to_representation(instance)

        if hasattr(instance, "teacher_profile"):
            data["is_teacher"] = True

        else:
            data["is_teacher"] = False

        return data


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherProfile
        fields = "__all__"


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = "__all__"