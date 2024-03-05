from courseapp.serializers import TeacherProfileSerializer
from courseapp.serializers import StudentProfileSerializer
from courseapp.serializers import CoursesSerializer

from rest_framework.viewsets import ModelViewSet

from courseapp.models import TeacherProfile
from courseapp.models import StudentProfile
from courseapp.models import Course

from django.shortcuts import render


class CoursesViewSet(ModelViewSet):

    queryset = Course.objects.all()
    serializer_class = CoursesSerializer


class TeacherProfilesViewSet(ModelViewSet):

    queryset = TeacherProfile.objects.all()
    serializer_class = TeacherProfileSerializer


class StudentProfilesViewSet(ModelViewSet):

    queryset = StudentProfile.objects.all()
    serializer_class = StudentProfileSerializer


def courses_list(request):
    return render(request, 'courseapp/courses-list.html')


def teachers_list(request, id):
    return render(request, 'courseapp/teacher.html')