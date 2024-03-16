from django_filters.rest_framework import DjangoFilterBackend

from rest_framework.filters import OrderingFilter

from rest_framework.viewsets import ModelViewSet

# from courseapp.models import Enrollment

from courseapp.models import Course
from courseapp.models import Lesson
from courseapp.serializers import LessonSerializer, CourseSerializer


# class EnrollmentViewSet(ModelViewSet):
#
#     queryset = Enrollment.objects.all()
#     serializer_class = EnrollmentSerializer


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



