from courseapp.serializers import UserRegistrationSerializer
from courseapp.serializers import TeacherProfileSerializer
from courseapp.serializers import StudentProfileSerializer
from courseapp.serializers import EnrollmentSerializer
from courseapp.serializers import CoursesSerializer
from courseapp.serializers import VideoSerializer
from courseapp.serializers import TestSerializer

from rest_framework.permissions import IsAuthenticated

from rest_framework.viewsets import ModelViewSet

from django.contrib.auth.models import User

from courseapp.models import TeacherProfile
from courseapp.models import StudentProfile
from courseapp.models import Enrollment
from courseapp.models import Course
from courseapp.models import Video
from courseapp.models import Test

from django.shortcuts import render


class UsersViewSet(ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer

    def perform_create(self, serializer):
        serializer.save()


class TeacherProfilesViewSet(ModelViewSet):

    queryset = TeacherProfile.objects.all()
    serializer_class = TeacherProfileSerializer
    permission_classes = IsAuthenticated,


class StudentProfilesViewSet(ModelViewSet):

    queryset = StudentProfile.objects.all()
    serializer_class = StudentProfileSerializer
    permission_classes = IsAuthenticated,


class CoursesViewSet(ModelViewSet):

    queryset = Course.objects.all()
    serializer_class = CoursesSerializer
    permission_classes = IsAuthenticated,

    def perform_create(self, serializer):

        serializer.save(teacher_profile=self.request.user.teacher_profile)


class VideosViewSet(ModelViewSet):

    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = IsAuthenticated,


class TestsViewSet(ModelViewSet):

    queryset = Test.objects.all()
    serializer_class = TestSerializer
    permission_classes = IsAuthenticated,


class EnrollmentViewSet(ModelViewSet):

    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = IsAuthenticated,


def courses_list(request):
    return render(request, 'courseapp/courses-list.html')
