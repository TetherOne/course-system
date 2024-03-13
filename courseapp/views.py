from django_filters.rest_framework import DjangoFilterBackend

from courseapp.serializers import UserRegistrationSerializer
from courseapp.serializers import TeacherProfileSerializer
from courseapp.serializers import StudentProfileSerializer
from courseapp.serializers import EnrollmentsSerializer
from courseapp.serializers import CoursesSerializer
from courseapp.serializers import LessonsSerializer
from courseapp.serializers import TestsSerializer

from rest_framework.viewsets import ModelViewSet

from django.contrib.auth.models import User

from courseapp.models import TeacherProfile
from courseapp.models import StudentProfile
from courseapp.models import Enrollment
from courseapp.models import Course
from courseapp.models import Lesson
from courseapp.models import Test


class UsersViewSet(ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer

    def perform_create(self, serializer):
        serializer.save()


class TeacherProfilesViewSet(ModelViewSet):

    queryset = TeacherProfile.objects.all()
    serializer_class = TeacherProfileSerializer


class StudentProfilesViewSet(ModelViewSet):

    queryset = StudentProfile.objects.all()
    serializer_class = StudentProfileSerializer


class EnrollmentsViewSet(ModelViewSet):

    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentsSerializer


class CoursesViewSet(ModelViewSet):

    queryset = Course.objects.all()
    serializer_class = CoursesSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['teacher_profile']


class LessonsViewSet(ModelViewSet):

    queryset = Lesson.objects.all()
    serializer_class = LessonsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['course']


class TestsViewSet(ModelViewSet):

    queryset = Test.objects.prefetch_related('questions__answers').all()
    serializer_class = TestsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['lesson']