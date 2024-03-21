from checkpointapp.models import CheckPoint

from django.utils.html import format_html

from courseapp.models import Enrollment, LessonVideo
from courseapp.models import Module
from courseapp.models import Course

from django.contrib import admin


class CourseInline(admin.StackedInline):
    model = Module


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):

    inlines = [
        CourseInline,
    ]
    list_display = "id", "course_name", "description", "teacher_profile"
    list_display_links = "id", "course_name"
    search_fields = ("course_name",)
    list_filter = ("teacher_profile",)
    ordering = ("id",)
    list_per_page = 10

    def get_queryset(self, request):
        return Course.objects.select_related("teacher_profile")


class LessonVideoInLine(admin.StackedInline):
    model = LessonVideo


class CheckPointInline(admin.StackedInline):
    model = CheckPoint


@admin.register(Module)
class ModuleAdmin(admin.ModelAdmin):

    inlines = [
        CheckPointInline,
        LessonVideoInLine,
    ]
    list_display = "id", "lesson_name", "course"
    list_display_links = "id",
    search_fields = ("description",)
    list_filter = "course__course_name", "lesson_name"
    ordering = ("id",)
    list_per_page = 10

    def get_queryset(self, request):
        return Module.objects.select_related("course")


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):

    list_display = "id", "student_info", "course", "enrollment_date"
    list_display_links = "id", "student_info"
    search_fields = ("student__surname", "student__name", "student__father_name")
    list_filter = "course__course_name", "student"
    ordering = ("id",)
    list_per_page = 10

    def student_info(self, obj):
        return f"{obj.student.surname} {obj.student.name} {obj.student.father_name}"

    student_info.short_description = "Student Info"
