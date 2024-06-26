from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.filters import OrderingFilter
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from courses.models import Course, Enrollment, Lesson, LessonOtherFile, Module
from courses.permissions import IsOwnerOrReadOnly
from courses.serializers import (
    CourseSerializer,
    EnrollmentSerializer,
    LessonOtherFileSerializer,
    LessonSerializer,
    ModuleSerializer,
)


class BasePermissionViewSet(ModelViewSet):
    """
    Base ViewSet class with access rights checked upon creation.
    """

    def create(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not hasattr(
            request.user,
            "teacher_profile",
        ):
            return Response(
                {"detail": "У вас нет прав доступа для создания объекта."},
                status=status.HTTP_403_FORBIDDEN,
            )

        if request.user.teacher_profile.id != request.data.get(
            "teacher_profile",
        ):
            return Response(
                {"detail": "Вы можете создать объект только для себя."},
                status=status.HTTP_403_FORBIDDEN,
            )
        return super().create(request, *args, **kwargs)


class EnrollmentViewSet(ModelViewSet):
    queryset = Enrollment.objects.prefetch_related(
        "student",
        "course",
    ).all()
    serializer_class = EnrollmentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        "student",
        "course",
    ]

    def get_serializer_context(self):
        """
        Pass the password to serializer
        """
        context = super().get_serializer_context()
        context["course_password"] = self.request.data.get(
            "course_password",
        )
        return context


class CourseViewSet(ModelViewSet):
    queryset = Course.objects.prefetch_related(
        "teacher_profile",
    ).all()
    serializer_class = CourseSerializer
    filter_backends = [
        DjangoFilterBackend,
        OrderingFilter,
    ]
    permission_classes = [IsOwnerOrReadOnly]
    filterset_fields = ["teacher_profile"]
    ordering_fields = ["created_at"]


class ModuleViewSet(ModelViewSet):
    queryset = Module.objects.prefetch_related(
        "course",
    ).all()
    serializer_class = ModuleSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        "course",
        "name",
    ]


class LessonViewSet(ModelViewSet):
    queryset = Lesson.objects.prefetch_related(
        "module",
    ).all()
    serializer_class = LessonSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["module"]


class LessonOtherFileViewSet(ModelViewSet):
    queryset = LessonOtherFile.objects.prefetch_related(
        "lesson",
    ).all()
    serializer_class = LessonOtherFileSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["lesson"]
