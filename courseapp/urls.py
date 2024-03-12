from courseapp.views import TeacherProfilesViewSet
from courseapp.views import StudentProfilesViewSet
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


urlpatterns = [
    path('', include(routers.urls)),
]
