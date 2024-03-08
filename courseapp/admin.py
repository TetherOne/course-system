from courseapp.models import TeacherProfile
from courseapp.models import StudentProfile
from courseapp.models import Enrollment
from courseapp.models import Question
from courseapp.models import Answer
from courseapp.models import Course
from courseapp.models import Video
from courseapp.models import Test

from django.utils.html import format_html

from django.contrib import admin


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):

    list_display = 'id', 'student_full_name', 'course', 'enrollment_date'
    list_display_links = 'id', 'student_full_name'
    search_fields = 'student__name', 'student__surname', 'student__father_name', 'course__course_name'
    list_filter = 'student__name', 'student__surname', 'student__father_name', 'course__course_name', 'enrollment_date'
    ordering = 'id',
    list_per_page = 10

    def student_full_name(self, obj):
        return f"{obj.student.surname} {obj.student.name} {obj.student.father_name}"



class TeacherCoursesInline(admin.StackedInline):
    model = Course

@admin.register(TeacherProfile)
class TeacherProfileAdmin(admin.ModelAdmin):

    inlines = [
        TeacherCoursesInline,
    ]
    list_display = 'id', 'surname', 'name', 'father_name', 'faculty', 'avatar'
    list_display_links = 'id', 'surname'
    search_fields = 'surname', 'father_name', 'faculty'
    list_filter = 'surname', 'father_name', 'faculty'
    ordering = 'id',
    list_per_page = 10



@admin.register(StudentProfile)
class StudentProfileAdmin(admin.ModelAdmin):

    list_display = 'id', 'surname', 'name', 'father_name', 'faculty', 'group', 'avatar'
    list_display_links = 'id', 'surname'
    search_fields = 'surname', 'father_name', 'faculty', 'group'
    list_filter = 'surname', 'father_name', 'faculty', 'group'
    ordering = 'id',
    list_per_page = 10



class CourseInline(admin.StackedInline):
    model = Video

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):

    inlines = [
        CourseInline,
    ]
    list_display = 'id', 'course_name', 'description', 'teacher_profile'
    list_display_links = 'id', 'course_name'
    search_fields = 'course_name',
    list_filter = 'teacher_profile',
    ordering = 'id',
    list_per_page = 10

    def get_queryset(self, request):
        return Course.objects.select_related('teacher_profile')



class TestInline(admin.StackedInline):
    model = Test

@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):

    inlines = [
        TestInline,
    ]
    list_display = 'id', 'lesson_name', 'description', 'display_video', 'course'
    list_display_links = 'id', 'description'
    search_fields = 'description',
    list_filter = ('course__course_name', 'lesson_name')
    ordering = 'id',
    list_per_page = 10

    def get_queryset(self, request):
        return Video.objects.select_related('course')

    def display_video(self, obj):
        if obj.video:
            return format_html(f'<video src="{obj.video.url}" controls width="200px" height="150px"></video>')



class QuestionInline(admin.StackedInline):
    model = Question

@admin.register(Test)
class TestAdmin(admin.ModelAdmin):

    inlines = [
        QuestionInline,
    ]
    list_display = 'id', 'title', 'lesson', 'course_name'
    list_display_links = 'id', 'title'
    search_fields = 'title',
    list_filter = ('video__lesson_name', 'video__course__course_name')
    ordering = 'id',
    list_per_page = 10

    def lesson(self, obj):
        return obj.video.lesson_name if obj.video else None

    def course_name(self, obj):
        return obj.video.course.course_name if obj.video else None



class AnswerInline(admin.StackedInline):
    model = Answer

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):

    inlines = [
        AnswerInline,
    ]
    list_display = 'id', 'question_text', 'lesson', 'course_name'
    list_display_links = 'id', 'question_text'
    search_fields = 'question_text',
    list_filter = ('test__video__lesson_name', 'test__video__course__course_name')
    ordering = 'id',
    list_per_page = 10

    def lesson(self, obj):
        if obj.test and obj.test.video:
            return obj.test.video.lesson_name
        return None

    def course_name(self, obj):
        if obj.test and obj.test.video:
            return obj.test.video.course.course_name
        return None