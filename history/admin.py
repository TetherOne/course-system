from history.models import HistoryOfSelectedAnswer

from django.contrib import admin


@admin.register(HistoryOfSelectedAnswer)
class HistoryOfSelectedAnswerAdmin(admin.ModelAdmin):

    list_display = (
        "student",
        "checkpoint",
        "question",
        "selected_answer",
        "attempt_number",
        "is_correct",
        "points",
    )
