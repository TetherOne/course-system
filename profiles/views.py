from django_filters.rest_framework import DjangoFilterBackend

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

    def perform_create(self, serializer):
        serializer.save()


class TeacherProfileViewSet(ModelViewSet):

    queryset = TeacherProfile.objects.all()
    serializer_class = TeacherSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["user"]


class StudentProfileViewSet(ModelViewSet):

    queryset = StudentProfile.objects.all()
    serializer_class = StudentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["user"]
