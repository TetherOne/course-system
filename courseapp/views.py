from django.shortcuts import render

from courseapp.serializers import TeacherProfileSerializer
from courseapp.serializers import CoursesSerializer

from rest_framework.viewsets import ModelViewSet

from courseapp.models import TeacherProfile
from courseapp.models import Course


class CoursesViewSet(ModelViewSet):

    queryset = Course.objects.all()
    serializer_class = CoursesSerializer


class TeacherProfilesViewSet(ModelViewSet):

    queryset = TeacherProfile.objects.all()
    serializer_class = TeacherProfileSerializer


def teacher_profiles(request):
    return render(request, 'courseapp/teacher-profiles.html')


def courses_list(request):
    return render(request, 'courseapp/courses-list.html')

def teacher(request, id):
    return render(request, 'courseapp/teacher.html')