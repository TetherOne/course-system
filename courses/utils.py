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
