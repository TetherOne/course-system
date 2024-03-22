from checkpointapp.models import CheckPoint
from courseapp.models import LessonVideo
from courseapp.models import Enrollment
from courseapp.models import Module
from courseapp.models import Course

from django.utils.html import format_html

from django.contrib import admin


class CourseInline(admin.StackedInline):
    model = Module


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):

    inlines = [
        CourseInline,
    ]
    list_display = "id", "course_name", "short_description", "teacher_profile"
    list_display_links = "id", "course_name"
    search_fields = ("course_name",)
    list_filter = ("teacher_profile",)
    ordering = ("id",)
    list_per_page = 10

    def get_queryset(self, request):
        return Course.objects.select_related("teacher_profile")

    def short_description(self, obj):
        return f"{obj.description[:50]}..."


class LessonVideoInline(admin.StackedInline):
    model = LessonVideo


class CheckpointInline(admin.TabularInline):
    model = CheckPoint


@admin.register(Module)
class ModuleAdmin(admin.ModelAdmin):

    inlines = [
        LessonVideoInline,
        CheckpointInline,
    ]
    list_display = "id", "module_name", "created_at", "course_name"
    list_display_links = "id", "module_name"
    search_fields = ("module_name",)
    list_per_page = 10

    def course_name(self, obj):
        return obj.course.course_name


@admin.register(LessonVideo)
class LessonVideoAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "lesson_name",
        "description",
        "course_name",
        "module",
        "created_at",
        "display_lesson",
    )
    list_display_links = "id", "description"
    search_fields = ("description",)
    ordering = ("id",)
    list_per_page = 10

    def display_lesson(self, obj):
        if obj.video:
            return format_html(
                f'<video src="{obj.video.url}" controls width="200px" height="150px"></video>'
            )

    def course_name(self, obj):
        return obj.module.course


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ("id", "student", "course", "enrollment_date")
    list_display_links = ("id", "student")
    search_fields = ("student__user__username", "course__course_name")
    list_per_page = 10
