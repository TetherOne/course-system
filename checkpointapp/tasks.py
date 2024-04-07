def calculate_percentage_and_status(instance):
    """
    Calculating the percentage and status (pass/fail)
    for a checkpoint and updating the summary points.
    """
    if instance.checkpoint:
        total_max_points = sum(
            question.max_points for question in instance.checkpoint.questions.all()
        )
        if total_max_points > 0:
            instance.percent = (instance.points / total_max_points) * 100
        else:
            instance.percent = 0.0

        if instance.percent < 41:
            instance.grade = "2"
            instance.status = "Не зачет"
        elif 41 <= instance.percent <= 61:
            instance.grade = "3"
            instance.status = "Зачет"
        elif 61 < instance.percent <= 81:
            instance.grade = "4"
            instance.status = "Зачет"
        else:
            instance.grade = "5"
            instance.status = "Зачет"


def set_summary_grade(instance):
    """
    To calculate the grade of course
    """
    if instance.total == 0:
        instance.grade = None
    else:
        percentage = (instance.current_points / instance.total) * 100
        if percentage < 41:
            instance.grade = '2'
        elif 41 <= percentage < 63:
            instance.grade = '3'
        elif 63 <= percentage < 85:
            instance.grade = '4'
        else:
            instance.grade = '5'