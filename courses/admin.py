from django.contrib import admin
from django.utils.html import format_html

from checkpoints.models import CheckPoint
from courses.models import Course, Enrollment, Lesson, LessonOtherFile, Module


class CourseInline(admin.StackedInline):
    model = Module


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    inlines = [
        CourseInline,
    ]
    list_display = (
        "id",
        "course_name",
        "short_description",
        "teacher_profile",
        "status",
    )
    list_display_links = (
        "id",
        "course_name",
    )
    search_fields = ("course_name",)
    list_filter = ("teacher_profile",)
    list_per_page = 10

    def get_queryset(self, request):
        return Course.objects.select_related("teacher_profile")

    def short_description(self, obj):
        return f"{obj.description[:50]}..."


class LessonInline(admin.StackedInline):
    model = Lesson


class CheckpointInline(admin.TabularInline):
    model = CheckPoint


@admin.register(Module)
class ModuleAdmin(admin.ModelAdmin):
    inlines = [
        LessonInline,
        CheckpointInline,
    ]
    list_display = (
        "id",
        "name",
        "created_at",
        "course_name",
    )
    list_display_links = (
        "id",
        "name",
    )
    search_fields = ("name",)
    list_per_page = 10

    def course_name(self, obj):
        return obj.course.course_name


class LessonOtherFileInline(admin.StackedInline):
    model = LessonOtherFile


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    inlines = [
        LessonOtherFileInline,
    ]
    list_display = (
        "id",
        "name",
        "course_name",
        "module",
        "created_at",
        "display_lesson",
    )
    list_display_links = ("id",)
    search_fields = ("description",)
    list_per_page = 10

    def display_lesson(self, obj):
        if obj.video:
            return format_html(
                f'<video src="{obj.video.url}" controls'
                f' width="200px" height="150px"></video>'
            )

    def course_name(self, obj):
        return obj.module.course


@admin.register(LessonOtherFile)
class LessonOtherFileAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "lesson",
        "other_file",
    )
    list_display_links = (
        "id",
        "lesson",
    )
    list_per_page = 10


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "student",
        "course",
        "enrollment_date",
    )
    list_display_links = (
        "id",
        "student",
    )
    search_fields = (
        "student__user__username",
        "course__course_name",
    )
    list_per_page = 10
