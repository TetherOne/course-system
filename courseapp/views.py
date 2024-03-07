from courseapp.serializers import TeacherProfileSerializer
from courseapp.serializers import StudentProfileSerializer
from courseapp.serializers import CoursesSerializer
from courseapp.serializers import VideoSerializer

from rest_framework.viewsets import ModelViewSet

from courseapp.models import TeacherProfile
from courseapp.models import StudentProfile
from courseapp.models import Course
from courseapp.models import Video

from django.shortcuts import render


class TeacherProfilesViewSet(ModelViewSet):

    queryset = TeacherProfile.objects.all()
    serializer_class = TeacherProfileSerializer


class StudentProfilesViewSet(ModelViewSet):

    queryset = StudentProfile.objects.all()
    serializer_class = StudentProfileSerializer


class CoursesViewSet(ModelViewSet):

    queryset = Course.objects.all()
    serializer_class = CoursesSerializer


class VideosViewSet(ModelViewSet):

    queryset = Video.objects.all()
    serializer_class = VideoSerializer


# def courses_list(request):
#     return render(request, 'courseapp/courses-list.html')
#
#
# def teachers_list(request, id):  # А чё он стал teachers_list? Эта функция ведь выдаёт страницу одного учителя
#     return render(request, 'courseapp/teacher.html')