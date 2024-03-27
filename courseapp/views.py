from django_filters.rest_framework import DjangoFilterBackend

from courseapp.serializers import LessonOtherFileSerializer
from courseapp.serializers import EnrollmentSerializer
from courseapp.serializers import LessonSerializer
from courseapp.serializers import CourseSerializer
from courseapp.serializers import ModuleSerializer

from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from django.db.models.signals import post_delete
from django.db.models.signals import post_save

from rest_framework.filters import OrderingFilter

from rest_framework.viewsets import ModelViewSet

from courseapp.models import LessonOtherFile
from courseapp.models import Enrollment
from courseapp.models import Lesson
from courseapp.models import Course
from courseapp.models import Module

from django.dispatch import receiver

from django.core.cache import cache


@receiver(post_save, sender=Enrollment,)
@receiver(post_delete, sender=Enrollment,)
def clear_enrollment_cache(sender, instance, **kwargs):
    cache.clear()


class EnrollmentViewSet(ModelViewSet):

    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["student", "course"]

    @method_decorator(cache_page(60 * 2, key_prefix='enrollments'))
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)


class CourseViewSet(ModelViewSet):

    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ["teacher_profile"]
    ordering_fields = ["created_at"]


class ModuleViewSet(ModelViewSet):

    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["course", "module_name"]


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