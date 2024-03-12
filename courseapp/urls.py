from courseapp.views import StudentProfilesViewSet
from courseapp.views import TeacherProfilesViewSet
from courseapp.views import EnrollmentsViewSet
from courseapp.views import QuestionsViewSet
from courseapp.views import AnswersViewSet
from courseapp.views import LessonsViewSet
from courseapp.views import TestsViewSet
from courseapp.views import UsersViewSet

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
    'lessons',
    LessonsViewSet,
)
routers.register(
    'tests',
    TestsViewSet,
)
routers.register(
    'questions',
    QuestionsViewSet,
)
routers.register(
    'answers',
    AnswersViewSet,
)


urlpatterns = [
    path('', include(routers.urls)),
]
