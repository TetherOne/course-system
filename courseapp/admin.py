from checkpointapp.models import CheckPoint

from django.utils.html import format_html

from courseapp.models import Enrollment
from courseapp.models import Lesson
from courseapp.models import Course

from django.contrib import admin


class CourseInline(admin.StackedInline):
    model = Lesson


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


class CheckPointInline(admin.StackedInline):
    model = CheckPoint


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):

    inlines = [
        CheckPointInline,
    ]
    list_display = "id", "lesson_name", "description", "display_lesson", "course"
    list_display_links = "id", "description"
    search_fields = ("description",)
    list_filter = "course__course_name", "lesson_name"
    ordering = ("id",)
    list_per_page = 10

    def get_queryset(self, request):
        return Lesson.objects.select_related("course")

    def display_lesson(self, obj):
        if obj.video:
            return format_html(
                f'<video src="{obj.video.url}" controls width="200px" height="150px"></video>'
            )


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
