from django.contrib.auth.models import User

from django.db import models


class Enrollment(models.Model):

    student = models.ForeignKey(
        "StudentProfile", on_delete=models.CASCADE, related_name="enrollments"
    )
    course = models.ForeignKey(
        "Course", on_delete=models.CASCADE, related_name="enrollments"
    )
    enrollment_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("student", "course")


class TeacherProfile(models.Model):

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    surname = models.CharField(max_length=100, blank=True, null=True)
    father_name = models.CharField(max_length=100, blank=True, null=True)
    faculty = models.CharField(max_length=100, blank=True, null=True)
    avatar = models.FileField(null=True, upload_to="teacher-avatars/", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="teacher_profile",
    )

    def __str__(self):
        return f"{self.surname}, {self.faculty}"


class StudentProfile(models.Model):

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    surname = models.CharField(max_length=100, blank=True, null=True)
    father_name = models.CharField(max_length=100, blank=True, null=True)
    faculty = models.CharField(max_length=100, blank=True, null=True)
    group = models.CharField(max_length=100, blank=True, null=True)
    avatar = models.FileField(null=True, upload_to="student-avatars/", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="student_profile",
    )


class Course(models.Model):

    id = models.AutoField(primary_key=True)
    course_name = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(max_length=10000, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    teacher_profile = models.ForeignKey(
        TeacherProfile,
        on_delete=models.SET_NULL,
        null=True,
        related_name="courses",
    )

    def __str__(self):
        return f"{self.course_name}"


def course_video_directory_path(instance: "Video", filename: str) -> str:
    return f"videos/{instance.course.course_name}/{filename}"


class Lesson(models.Model):

    id = models.AutoField(primary_key=True)
    lesson_name = models.CharField(max_length=100, blank=True, null=True)
    video = models.FileField(
        null=True, upload_to=course_video_directory_path, blank=True
    )
    description = models.TextField(max_length=10000, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="videos",
    )


class Test(models.Model):

    id = models.AutoField(primary_key=True)
    lesson = models.ForeignKey(
        Lesson,
        on_delete=models.SET_NULL,
        null=True,
        related_name="test",
    )
    title = models.TextField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)


class Question(models.Model):

    id = models.AutoField(primary_key=True)
    test = models.ForeignKey(Test, on_delete=models.CASCADE, related_name="questions")
    question_text = models.CharField(max_length=255)
    max_points = models.IntegerField()


class Answer(models.Model):

    id = models.AutoField(primary_key=True)
    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name="answers"
    )
    answer_text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)


class PassedTest(models.Model):

    id = models.AutoField(primary_key=True)
    student = models.ForeignKey(
        StudentProfile, on_delete=models.CASCADE, related_name="passed_tests"
    )
    test = models.ForeignKey(
        Test, on_delete=models.CASCADE, related_name="passed_tests"
    )
    points = models.IntegerField()
    percent = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
