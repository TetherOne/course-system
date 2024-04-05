from userapp.models import TeacherProfile
from userapp.models import StudentProfile

from django.contrib import admin


@admin.register(TeacherProfile)
class TeacherProfileAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "surname",
        "name",
        "father_name",
        "faculty",
        "avatar",
    )
    list_display_links = (
        "id",
        "surname",
    )
    search_fields = (
        "surname",
        "father_name",
        "faculty",
    )
    list_filter = (
        "surname",
        "father_name",
        "faculty",
    )
    ordering = ("id",)
    list_per_page = 10


@admin.register(StudentProfile)
class StudentProfileAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "surname",
        "name",
        "father_name",
        "faculty",
        "group",
        "avatar",
    )
    list_display_links = (
        "id",
        "surname",
    )
    search_fields = (
        "surname",
        "father_name",
        "faculty",
        "group",
    )
    list_filter = (
        "surname",
        "father_name",
        "faculty",
        "group",
    )
    ordering = ("id",)
    list_per_page = 10
