from django.http import HttpResponse
from django.http import HttpRequest

from django.shortcuts import render

from rest_framework.viewsets import ModelViewSet

from courseapp.models import Course, TeacherProfile
from courseapp.serializers import CoursesSerializer, TeacherProfileSerializer


def main_page(request: HttpRequest) -> HttpResponse:
    return render(request, 'courseapp/main-page.html')


class CoursesViewSet(ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CoursesSerializer


class TeacherProfilesViewSet(ModelViewSet):
    queryset = TeacherProfile.objects.all()
    serializer_class = TeacherProfileSerializer