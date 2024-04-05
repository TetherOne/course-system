from django.contrib.auth.models import AnonymousUser

from django.contrib.auth import get_user_model

from rest_framework import serializers


class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = [
            "id",
            "username",
            "email",
            "date_joined",
        ]

    def to_representation(self, instance):
        if isinstance(instance, AnonymousUser):
            return {
                "id": None,
                "username": None,
                "email": None,
                "date_joined": None,
            }
        return super().to_representation(instance)
