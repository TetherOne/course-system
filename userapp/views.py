from django_filters.rest_framework import DjangoFilterBackend

from userapp.serializers import UserRegistrationSerializer
from userapp.serializers import TeacherSerializer
from userapp.serializers import StudentSerializer

from rest_framework.viewsets import ModelViewSet

from userapp.models import TeacherProfile
from userapp.models import StudentProfile

from authapp.models import CustomUser


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
