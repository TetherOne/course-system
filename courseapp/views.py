from rest_framework import status

from courseapp.serializers import UserRegistrationSerializer, QuestionSerializer
from courseapp.serializers import TeacherProfileSerializer
from courseapp.serializers import StudentProfileSerializer
from courseapp.serializers import EnrollmentSerializer
from courseapp.serializers import CoursesSerializer
from courseapp.serializers import VideoSerializer
from courseapp.serializers import TestSerializer

from rest_framework.permissions import IsAuthenticated

from rest_framework.viewsets import ModelViewSet

from rest_framework.response import Response

from rest_framework.decorators import action

from django.contrib.auth.models import User

from django.core.cache import cache

from courseapp.models import TeacherProfile, Question
from courseapp.models import StudentProfile
from courseapp.models import Enrollment
from courseapp.models import Course
from courseapp.models import Video
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


class CoursesViewSet(ModelViewSet):

    queryset = Course.objects.select_related('teacher_profile').all()
    serializer_class = CoursesSerializer

    # def perform_create(self, serializer):
    #
    #     serializer.save(
    #         teacher_profile=self.request.user.teacher_profile,
    #     )

    @action(detail=True, methods=['get'])
    def students_list(self, request, pk=None):

        course = self.get_object()
        enrollments = Enrollment.objects.filter(course=course)
        students = [enrollment.student for enrollment in enrollments]
        serializer = StudentProfileSerializer(students, many=True)

        return Response(serializer.data)


class VideosViewSet(ModelViewSet):

    queryset = Video.objects.all()
    serializer_class = VideoSerializer


class TestsViewSet(ModelViewSet):

    queryset = Test.objects.all()
    serializer_class = TestSerializer


class EnrollmentsViewSet(ModelViewSet):

    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer


class QuestionsViewSet(ModelViewSet):

    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(test_id=kwargs['test_pk'])  # Сохраняем ID теста для создания связи
        return Response(serializer.data, status=status.HTTP_201_CREATED)