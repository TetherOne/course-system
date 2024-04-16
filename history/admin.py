from django.contrib import admin

from history.models import HistoryOfPassedAnswer


@admin.register(HistoryOfPassedAnswer)
class HistoryOfPassedAnswerAdmin(admin.ModelAdmin):

    list_display = "student", "checkpoint", "question", "selected_answer",
