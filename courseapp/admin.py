from courseapp.models import TeacherProfile, Video
from courseapp.models import StudentProfile
from courseapp.models import Course

from django.contrib import admin


@admin.register(TeacherProfile)
class TeacherProfileAdmin(admin.ModelAdmin):

    list_display = 'id', 'surname', 'father_name', 'faculty', 'avatar'
    list_display_links = 'id', 'surname'
    search_fields = 'surname', 'father_name', 'faculty'
    list_filter = 'surname', 'father_name', 'faculty'
    ordering = 'id',
    list_per_page = 10


@admin.register(StudentProfile)
class StudentProfileAdmin(admin.ModelAdmin):

    list_display = 'id', 'surname', 'father_name', 'faculty', 'group', 'avatar'
    list_display_links = 'id', 'surname'
    search_fields = 'surname', 'father_name', 'faculty', 'group'
    list_filter = 'surname', 'father_name', 'faculty', 'group'
    ordering = 'id',
    list_per_page = 10


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):

    list_display = 'id', 'name', 'description', 'teacher_profile'
    list_display_links = 'id', 'name'
    search_fields = 'name',
    list_filter = 'teacher_profile',
    ordering = 'id',
    list_per_page = 10

    def get_queryset(self, request):
        return Course.objects.select_related('teacher_profile')


@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):

    list_display = 'id', 'description', 'course'
    list_display_links = 'id', 'description'
    search_fields = 'description',
    list_filter = 'course',
    ordering = 'id',
    list_per_page = 10

    def get_queryset(self, request):
        return Video.objects.select_related('course')