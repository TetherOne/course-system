from django.db.models import Max, Sum

from history.models import HistoryOfSelectedAnswer


def calculate_points(student, checkpoint):
    """
    Calculate points for the passed checkpoint based
    on the last attempt for each question.
    """
    total_points = 0
    history_records = (
        HistoryOfSelectedAnswer.objects.filter(
            student=student,
            checkpoint=checkpoint,
        )
        .order_by("question", "-attempt_number")
        .distinct("question")
    )
    for passed_question in history_records:
        total_points += passed_question.points
    return total_points


def calculate_total_points(course):
    """
    Calculate total points for the course.
    """
    from checkpoints.models import CheckPoint
    from questions.models import Question

    total_points = 0
    checkpoints = CheckPoint.objects.filter(
        module__course=course,
    )
    for checkpoint in checkpoints:
        total_points += (
            Question.objects.filter(
                checkpoint=checkpoint,
            ).aggregate(
                total_points=Sum("max_points"),
            )["total_points"]
            or 0
        )
    return total_points


def calculate_current_points(student, course):
    """
    Calculate current points for the student in the course.
    """
    from checkpoints.models import PassedCheckPoint

    current_points = 0
    latest_passed_checkpoints = (
        PassedCheckPoint.objects.filter(
            student=student,
            checkpoint__module__course=course,
        )
        .values(
            "checkpoint__module",
        )
        .annotate(
            max_created_at=Max("created_at"),
        )
    )

    for module_checkpoint in latest_passed_checkpoints:
        latest_checkpoint = PassedCheckPoint.objects.filter(
            student=student,
            checkpoint__module=module_checkpoint["checkpoint__module"],
            created_at=module_checkpoint["max_created_at"],
        ).first()

        if latest_checkpoint:
            current_points += latest_checkpoint.points
        else:
            current_points += 0

    return current_points


def calculate_grade(current_points, total_points):
    """
    Calculate grade for Summary
    """
    if total_points == 0:
        return ""
    percent = (current_points / total_points) * 100
    if percent >= 81:
        return "5"
    elif percent >= 61:
        return "4"
    elif percent >= 41:
        return "3"
    else:
        return "2"
