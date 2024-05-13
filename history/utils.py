from history.models import HistoryOfSelectedAnswer


def calculate_points(selected_answer, question):
    if selected_answer and selected_answer.is_correct:
        return question.max_points
    else:
        return 0


def determine_attempt_number(student, checkpoint, question):
    previous_attempts = HistoryOfSelectedAnswer.objects.filter(
        student=student,
        checkpoint=checkpoint,
        question=question,
    ).order_by("-attempt_number")
    if previous_attempts.exists():
        return previous_attempts.first().attempt_number + 1
    else:
        return 1
