from django_filters.rest_framework import DjangoFilterBackend

from courseapp.serializers import UserRegistrationSerializer
from courseapp.serializers import TeacherProfileSerializer
from courseapp.serializers import StudentProfileSerializer
from courseapp.serializers import EnrollmentsSerializer
from courseapp.serializers import QuestionsSerializer
from courseapp.serializers import CoursesSerializer
from courseapp.serializers import AnswersSerializer
from courseapp.serializers import LessonsSerializer
from courseapp.serializers import TestsSerializer

from rest_framework.viewsets import ModelViewSet

from rest_framework.response import Response

from rest_framework.decorators import action

from django.contrib.auth.models import User

from courseapp.models import TeacherProfile
from courseapp.models import StudentProfile
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


class EnrollmentsViewSet(ModelViewSet):

    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentsSerializer


class CoursesViewSet(ModelViewSet):

    queryset = Course.objects.all()
    serializer_class = CoursesSerializer


class LessonsViewSet(ModelViewSet):

    queryset = Lesson.objects.all()
    serializer_class = LessonsSerializer


class TestsViewSet(ModelViewSet):

    queryset = Test.objects.all()
    serializer_class = TestsSerializer


class QuestionsViewSet(ModelViewSet):

    queryset = Question.objects.all()
    serializer_class = QuestionsSerializer


class AnswersViewSet(ModelViewSet):

    queryset = Answer.objects.all()
    serializer_class = AnswersSerializer