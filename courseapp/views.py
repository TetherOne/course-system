from django_filters.rest_framework import DjangoFilterBackend

from courseapp.serializers import UserRegistrationSerializer
from courseapp.serializers import TeacherProfileSerializer
from courseapp.serializers import StudentProfileSerializer
from courseapp.serializers import EnrollmentsSerializer
from courseapp.serializers import PassedTestsSerializer
from courseapp.serializers import QuestionsSerializer
from courseapp.serializers import AnswersSerializer
from courseapp.serializers import CoursesSerializer
from courseapp.serializers import LessonsSerializer
from courseapp.serializers import TestsSerializer

from rest_framework.filters import OrderingFilter

from rest_framework.viewsets import ModelViewSet

from django.contrib.auth.models import User

from courseapp.models import TeacherProfile
from courseapp.models import StudentProfile
from courseapp.models import PassedTest
from courseapp.models import Enrollment
from courseapp.models import Question
from courseapp.models import Answer
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
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['teacher_profile']
    ordering_fields = ['created_at']


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


class QuestionsViewSet(ModelViewSet):

    queryset = Question.objects.all()
    serializer_class = QuestionsSerializer


class AnswersViewSet(ModelViewSet):

    queryset = Answer.objects.all()
    serializer_class = AnswersSerializer


class PassedTestsViewSet(ModelViewSet):

    queryset = PassedTest.objects.all()
    serializer_class = PassedTestsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['test', 'student']
    ordering_fields = ['created_at']