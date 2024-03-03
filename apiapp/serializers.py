from rest_framework import serializers

from courseapp.models import TeacherProfile


class TeacherProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherProfile
        fields = '__all__'