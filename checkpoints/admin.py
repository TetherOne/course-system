from checkpoints.models import PassedCheckPoint
from checkpoints.models import CheckPoint
from checkpoints.models import Summary

from questions.models import Question

from django.contrib import admin


class QuestionInline(admin.StackedInline):
    model = Question


@admin.register(CheckPoint)
class CheckPointAdmin(admin.ModelAdmin):

    inlines = [
        QuestionInline,
    ]
    list_display = (
        "id",
        "name",
        "course_name",
        "module_name",
    )
    list_display_links = "id", "name"
    search_fields = ("name",)
    list_filter = ("module__course__course_name",)

    def module_name(self, obj):
        return getattr(
            obj.module,
            "lesson_name",
            None,
        )

    def course_name(self, obj):
        return getattr(
            obj.module.course,
            "course_name",
            None,
        )

    module_name.short_description = "Module"
    course_name.short_description = "Course"


@admin.register(PassedCheckPoint)
class PassedCheckPointAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "student",
        "checkpoint",
        "points",
        "created_at",
        "percent",
        "status",
        "grade",
    )
    list_display_links = (
        "id",
        "student",
    )
    search_fields = (
        "student__surname",
        "student__name",
        "checkpoint__title",
    )
    list_filter = (
        "student",
        "checkpoint",
    )
    list_per_page = 10


@admin.register(Summary)
class SummaryAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "student",
        "course",
        "total",
        "current_points",
        "grade",
    )
