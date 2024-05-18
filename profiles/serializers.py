from rest_framework import serializers

from authentication.models import CustomUser
from profiles.models import StudentProfile, TeacherProfile


class UserRegistrationSerializer(serializers.ModelSerializer):

    is_teacher = serializers.BooleanField(default=False)

    class Meta:

        model = CustomUser
        fields = (
            "id",
            "email",
            "username",
            "password",
            "is_teacher",
        )
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        """
        For creating a user profile
        """
        is_teacher = validated_data.pop("is_teacher", False)
        user = CustomUser.objects.create_user(**validated_data)

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
        fields = (
            "id",
            "name",
            "surname",
            "father_name",
            "faculty",
            "avatar",
            "created_at",
            "is_teacher",
            "user",
        )


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = (
            "id",
            "name",
            "surname",
            "father_name",
            "faculty",
            "group",
            "avatar",
            "is_teacher",
            "created_at",
            "user",
        )
