from history.models import HistoryOfPassedAnswer

from django.contrib import admin


@admin.register(HistoryOfPassedAnswer)
class HistoryOfPassedAnswerAdmin(admin.ModelAdmin):

    list_display = (
        "student",
        "checkpoint",
        "question",
        "selected_answer",
        "attempt_number",
        "is_correct",
        "points",
    )
