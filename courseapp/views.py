from courseapp.serializers import UserRegistrationSerializer
from courseapp.serializers import TeacherProfileSerializer
from courseapp.serializers import StudentProfileSerializer
from courseapp.serializers import CoursesSerializer

from rest_framework.viewsets import ModelViewSet

from rest_framework.response import Response

from rest_framework.decorators import action

from django.contrib.auth.models import User

from courseapp.models import TeacherProfile
from courseapp.models import StudentProfile


class UsersViewSet(ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer

    def perform_create(self, serializer):
        serializer.save()


class TeacherProfilesViewSet(ModelViewSet):

    queryset = TeacherProfile.objects.all()
    serializer_class = TeacherProfileSerializer

    def retrieve(self, request, *args, **kwargs):

        instance = self.get_object()
        serializer = self.get_serializer(instance)

        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def courses(self, request, pk=None):

        instance = self.get_object()
        courses = instance.courses.all()
        serializer = CoursesSerializer(courses, many=True)

        return Response(serializer.data)


class StudentProfilesViewSet(ModelViewSet):

    queryset = StudentProfile.objects.all()
    serializer_class = StudentProfileSerializer