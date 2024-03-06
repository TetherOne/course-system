from courseapp.models import TeacherProfile
from courseapp.models import StudentProfile
from courseapp.models import Course
from courseapp.models import Video

from django.contrib import admin


class TeacherCoursesInline(admin.StackedInline):

    model = Course


@admin.register(TeacherProfile)
class TeacherProfileAdmin(admin.ModelAdmin):

    inlines = [
        TeacherCoursesInline,
    ]
    list_display = 'id', 'username', 'surname', 'father_name', 'faculty', 'avatar'
    list_display_links = 'id', 'surname'
    search_fields = 'surname', 'father_name', 'faculty'
    list_filter = 'surname', 'father_name', 'faculty'
    ordering = 'id',
    list_per_page = 10

    def username(self, obj):
        return obj.user.first_name


@admin.register(StudentProfile)
class StudentProfileAdmin(admin.ModelAdmin):

    list_display = 'id', 'username', 'surname', 'father_name', 'faculty', 'group', 'avatar'
    list_display_links = 'id', 'surname'
    search_fields = 'surname', 'father_name', 'faculty', 'group'
    list_filter = 'surname', 'father_name', 'faculty', 'group'
    ordering = 'id',
    list_per_page = 10

    def username(self, obj):
        return obj.user.first_name


class CourseInline(admin.StackedInline):

    model = Video


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):

    inlines = [
        CourseInline,
    ]
    list_display = 'id', 'course_name', 'description', 'teacher_profile'
    list_display_links = 'id', 'course_name'
    search_fields = 'course_name',
    list_filter = 'teacher_profile',
    ordering = 'id',
    list_per_page = 10

    def get_queryset(self, request):
        return Course.objects.select_related('teacher_profile')


@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):

    list_display = 'id', 'lesson_name', 'description', 'video', 'course'
    list_display_links = 'id', 'description'
    search_fields = 'description',
    list_filter = 'course',
    ordering = 'id',
    list_per_page = 10

    def get_queryset(self, request):
        return Video.objects.select_related('course')