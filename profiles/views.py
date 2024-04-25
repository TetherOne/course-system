from django_filters.rest_framework import DjangoFilterBackend

from profiles.permissions import IsOwnerOrReadOnly
from profiles.serializers import UserRegistrationSerializer
from profiles.serializers import TeacherSerializer
from profiles.serializers import StudentSerializer

from rest_framework.viewsets import ModelViewSet

from profiles.models import TeacherProfile
from profiles.models import StudentProfile

from authentication.models import CustomUser


class UserViewSet(ModelViewSet):

    queryset = CustomUser.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save()


class TeacherProfileViewSet(ModelViewSet):

    queryset = TeacherProfile.objects.select_related("user").all()
    serializer_class = TeacherSerializer
    permission_classes = [IsOwnerOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["user"]


class StudentProfileViewSet(ModelViewSet):

    queryset = StudentProfile.objects.select_related("user").all()
    serializer_class = StudentSerializer
    permission_classes = [IsOwnerOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["user"]
