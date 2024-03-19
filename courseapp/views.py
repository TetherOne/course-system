from django_filters.rest_framework import DjangoFilterBackend

from courseapp.serializers import EnrollmentSerializer
from courseapp.serializers import CourseSerializer
from courseapp.serializers import LessonSerializer

from rest_framework.filters import OrderingFilter

from rest_framework.viewsets import ModelViewSet

from courseapp.models import Enrollment
from courseapp.models import Course
from courseapp.models import Lesson


class EnrollmentViewSet(ModelViewSet):

    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["student", "course"]


class CourseViewSet(ModelViewSet):

    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ["teacher_profile"]
    ordering_fields = ["created_at"]


class LessonViewSet(ModelViewSet):

    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["course"]
