from history.models import HistoryOfSelectedAnswer


def calculate_points(passed_checkpoint):
    """
    Calculate points for the passed checkpoint based on
    the last attempt for each question.
    """
    total_points = 0
    history_records = (
        HistoryOfSelectedAnswer.objects.filter(
            student=passed_checkpoint.student,
            checkpoint=passed_checkpoint.checkpoint,
        )
        .order_by(
            "question",
            "-attempt_number",
        )
        .distinct("question")
    )
    for passed_question in history_records:
        total_points += passed_question.points
    passed_checkpoint.points = total_points
