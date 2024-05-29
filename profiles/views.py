from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.viewsets import ModelViewSet

from authentication.models import CustomUser
from profiles.models import StudentProfile, TeacherProfile
from profiles.permissions import IsOwnerOrReadOnly
from profiles.serializers import (
    StudentSerializer,
    TeacherSerializer,
    UserRegistrationSerializer,
)


class UserViewSet(ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save()


class TeacherProfileViewSet(ModelViewSet):
    queryset = TeacherProfile.objects.select_related("user").all()
    serializer_class = TeacherSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["user"]
    permission_classes = [IsOwnerOrReadOnly]


class StudentProfileViewSet(ModelViewSet):
    queryset = StudentProfile.objects.select_related("user").all()
    serializer_class = StudentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["user"]
    permission_classes = [IsOwnerOrReadOnly]
