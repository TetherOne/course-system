from profiles.serializers import StudentSerializer

from rest_framework import serializers

from .models import LessonOtherFile
from .models import Enrollment
from .models import Lesson
from .models import Course
from .models import Module


class EnrollmentSerializer(serializers.ModelSerializer):

    student = StudentSerializer()

    class Meta:
        model = Enrollment
        fields = "__all__"


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = "__all__"


class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = "__all__"


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = "__all__"


class LessonOtherFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonOtherFile
        fields = "__all__"
