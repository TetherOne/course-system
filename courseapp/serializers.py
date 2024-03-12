from django.contrib.auth.models import User

from rest_framework import serializers

from .models import TeacherProfile
from .models import StudentProfile
from .models import Enrollment
from .models import Course


class UserRegistrationSerializer(serializers.ModelSerializer):

    is_teacher = serializers.BooleanField(default=False)

    class Meta:
        model = User
        fields = 'id', 'email', 'username', 'password', 'is_teacher'
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):

        is_teacher = validated_data.pop('is_teacher', False)
        user = User.objects.create_user(**validated_data)

        if is_teacher:
            TeacherProfile.objects.create(user=user)

        else:
            StudentProfile.objects.create(user=user)

        return user

    def to_representation(self, instance):

        data = super().to_representation(instance)

        if hasattr(instance, 'teacher_profile'):
            data['is_teacher'] = True

        else:
            data['is_teacher'] = False

        return data


class TeacherProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherProfile
        fields = '__all__'


class StudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = '__all__'


class CoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = '__all__'