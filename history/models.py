from django.db import models


class HistoryOfPassedAnswer(models.Model):

    student = models.ForeignKey(
        'profiles.StudentProfile',
        on_delete=models.SET_NULL,
        null=True,
    )
    checkpoint = models.ForeignKey(
        'checkpoints.CheckPoint',
        on_delete=models.SET_NULL,
        null=True,
    )
    question = models.ForeignKey(
        "questions.Question",
        on_delete=models.SET_NULL,
        null=True,
    )
    selected_answer = models.ForeignKey(
        "questions.Answer",
        on_delete=models.SET_NULL,
        null=True,
    )
    is_correct = models.BooleanField(default=False)
    points = models.IntegerField(default=0)

    def save(self, *args, **kwargs):
        if self.selected_answer and self.selected_answer.is_correct:
            self.is_correct = True
            self.points = self.question.max_points
        else:
            self.is_correct = False
            self.points = 0
        super().save(*args, **kwargs)