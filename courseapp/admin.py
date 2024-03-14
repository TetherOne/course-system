from courseapp.models import TeacherProfile, PassedTest
from courseapp.models import StudentProfile
from courseapp.models import Question
from courseapp.models import Answer
from courseapp.models import Course
from courseapp.models import Lesson
from courseapp.models import Test

from django.utils.html import format_html

from django.contrib import admin


@admin.register(TeacherProfile)
class TeacherProfileAdmin(admin.ModelAdmin):

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
    model = Lesson

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

@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):

    inlines = [
        TestInline,
    ]
    list_display = 'id', 'lesson_name', 'description', 'display_lesson', 'course'
    list_display_links = 'id', 'description'
    search_fields = 'description',
    list_filter = 'course__course_name', 'lesson_name'
    ordering = 'id',
    list_per_page = 10

    def get_queryset(self, request):
        return Lesson.objects.select_related('course')

    def display_lesson(self, obj):
        if obj.video:
            return format_html(f'<video src="{obj.video.url}" controls width="200px" height="150px"></video>')



class QuestionInline(admin.StackedInline):
    model = Question

@admin.register(Test)
class TestAdmin(admin.ModelAdmin):

    inlines = [
        QuestionInline,
    ]
    list_display = ('id', 'title', 'lesson_name', 'course_name')
    list_display_links = ('id', 'title')
    search_fields = ('title', )
    list_filter = ('lesson__lesson_name', 'lesson__course__course_name')
    ordering = ('id', )
    list_per_page = 10
    readonly_fields = ('lesson_name', 'course_name')

    def lesson_name(self, obj):
        return getattr(obj.lesson, 'lesson_name', None)
    lesson_name.short_description = 'Lesson'

    def course_name(self, obj):
        return getattr(obj.lesson.course, 'course_name', None)
    course_name.short_description = 'Course'



class AnswerInline(admin.StackedInline):
    model = Answer

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):

    inlines = [
        AnswerInline,
    ]
    list_display = 'id', 'question_text', 'lesson_name', 'course_name', 'max_points'
    list_display_links = 'id', 'question_text'
    search_fields = 'question_text',
    list_filter = 'test__lesson__lesson_name', 'test__lesson__course__course_name'
    ordering = 'id',
    list_per_page = 10
    readonly_fields = 'lesson_name', 'course_name'

    def lesson_name(self, obj):
        return getattr(obj.test.lesson, 'lesson_name', None)
    lesson_name.short_description = 'Lesson'

    def course_name(self, obj):
        return getattr(obj.test.lesson.course, 'course_name', None)
    course_name.short_description = 'Course'


@admin.register(PassedTest)
class PassedTestAdmin(admin.ModelAdmin):
    list_display = ('id', 'student', 'test', 'total_points', 'created_at')
    list_display_links = ('id', 'student')
    search_fields = ('student__surname', 'student__name', 'test__title')
    list_filter = ('student', 'test')
    ordering = ('id',)
    list_per_page = 10

    def total_points(self, obj):
        # Assuming that each test can have multiple questions,
        # we need to sum up the points for each question in the test.
        total_points = obj.test.questions.aggregate(total=models.Sum('max_points'))['total']
        return total_points if total_points is not None else 0