from courseapp.views import TeacherProfilesViewSet, UsersViewSet, QuestionsViewSet
from courseapp.views import StudentProfilesViewSet
from courseapp.views import EnrollmentsViewSet
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
    'enrollments',
    EnrollmentsViewSet,
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
    'questions',
    QuestionsViewSet,
)


urlpatterns = [
    path('', include(routers.urls)),
]
