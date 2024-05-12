import re


def answer_file_directory_path(
    instance: "AnswerFile",
    filename: str,
) -> str:
    """
    For saving files that the student
    attached to the answer to the question
    """
    valid_filename = re.sub(
        r"[\\/*?:\"<>|]",
        "_",
        instance.answer.question.checkpoint.name,
    )
    return f"answers/{valid_filename}/{filename}"


def question_file_directory_path(
    instance: "QuestionFile",
    filename: str,
) -> str:
    """
    For saving files that the teacher
    attached to the question
    """
    valid_filename = re.sub(
        r"[\\/*?:\"<>|]",
        "_",
        instance.question.question_text,
    )
    return (
        f"questions/{instance.question.checkpoint.name}/" f"{valid_filename}/{filename}"
    )
