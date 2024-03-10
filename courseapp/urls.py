from courseapp.views import TeacherProfilesViewSet, UsersViewSet
from courseapp.views import StudentProfilesViewSet
from courseapp.views import EnrollmentViewSet
from courseapp.views import CoursesViewSet
from courseapp.views import VideosViewSet
from courseapp.views import TestsViewSet

from rest_framework.routers import DefaultRouter

from django.urls import include
from django.urls import path


app_name = 'courseapp'


routers = DefaultRouter()
routers.register(
    'users',
    UsersViewSet,
)
routers.register(
    'courses',
    CoursesViewSet,
)
routers.register(
    'teacher-profiles',
    TeacherProfilesViewSet,
)
routers.register(
    'student-profiles',
    StudentProfilesViewSet,
)
routers.register(
    'videos',
    VideosViewSet,
)
routers.register(
    'tests',
    TestsViewSet,
)
routers.register(
    'enrollments',
    EnrollmentViewSet,
)


urlpatterns = [
    path('', include(routers.urls)),
]
