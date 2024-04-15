from django_filters.rest_framework import DjangoFilterBackend

from courses.serializers import LessonOtherFileSerializer
from courses.serializers import EnrollmentSerializer
from courses.serializers import LessonSerializer
from courses.serializers import CourseSerializer
from courses.serializers import ModuleSerializer

from rest_framework.filters import OrderingFilter

from rest_framework.viewsets import ModelViewSet

from courses.models import LessonOtherFile
from courses.models import Enrollment
from courses.models import Lesson
from courses.models import Course
from courses.models import Module


class EnrollmentViewSet(ModelViewSet):

    queryset = Enrollment.objects.prefetch_related("student")
    serializer_class = EnrollmentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        "student",
        "course",
    ]


class CourseViewSet(ModelViewSet):

    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    filter_backends = [
        DjangoFilterBackend,
        OrderingFilter,
    ]
    filterset_fields = ["teacher_profile"]
    ordering_fields = ["created_at"]


class ModuleViewSet(ModelViewSet):

    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        "course",
        "module_name",
    ]


class LessonViewSet(ModelViewSet):

    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["module"]


class LessonOtherFileViewSet(ModelViewSet):

    queryset = LessonOtherFile.objects.all()
    serializer_class = LessonOtherFileSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["lesson"]
