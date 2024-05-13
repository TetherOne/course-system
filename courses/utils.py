import re


def lesson_video_directory_path(
    instance: "LessonVideo",
    filename: str,
) -> str:
    """
    For saving course videos
    """
    valid_filename = re.sub(
        r"[\\/*?:\"<>|]",
        "_",
        instance.name,
    )
    return f"lessons/{instance.module.course.course_name}/{valid_filename}/{filename}"


def other_file_directory_path(
    instance: "LessonOtherFile",
    filename: str,
) -> str:
    """
    For saving additional course files
    """
    valid_filename = re.sub(
        r"[\\/*?:\"<>|]",
        "_",
        instance.lesson.name,
    )
    return (
        f"lessons/{instance.lesson.module.course.course_name}/"
        f"{valid_filename}/{filename}"
    )
