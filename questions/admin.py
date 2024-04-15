from questions.models import QuestionFile
from questions.models import AnswerFile
from questions.models import Question
from questions.models import Answer

from django.contrib import admin


class AnswerInline(admin.StackedInline):
    model = Answer


class QuestionFileInline(admin.StackedInline):
    model = QuestionFile


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):

    inlines = [
        AnswerInline,
        QuestionFileInline,
    ]
    list_display = (
        "id",
        "question_text",
        "module_name",
        "course_name",
        "max_points",
        "checkpoint_number",
    )
    list_display_links = (
        "id",
        "question_text",
    )
    search_fields = ("question_text",)
    list_filter = ("checkpoint__module__course__course_name",)
    ordering = ("id",)
    list_per_page = 10
    readonly_fields = (
        "module_name",
        "course_name",
    )

    def module_name(self, obj):
        return getattr(
            obj.checkpoint.module,
            "lesson_name",
            None,
        )

    module_name.short_description = "Module"

    def course_name(self, obj):
        return getattr(
            obj.checkpoint.module.course,
            "course_name",
            None,
        )

    course_name.short_description = "Course"

    def checkpoint_number(self, obj):
        return obj.checkpoint.checkpoint_number


class AnswerFileInLine(admin.StackedInline):
    model = AnswerFile


@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):

    inlines = [
        AnswerFileInLine,
    ]
    list_display = (
        "id",
        "question",
        "answer_text",
        "is_correct",
    )
    list_display_links = (
        "id",
        "question",
    )
    search_fields = ("question__question_text",)
    list_filter = ("question__checkpoint__module__course__course_name",)
    ordering = ("id",)
    list_per_page = 10
