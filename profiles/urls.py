from rest_framework.routers import DefaultRouter

from profiles.views import StudentProfileViewSet
from profiles.views import TeacherProfileViewSet
from profiles.views import UserViewSet

from django.urls import include
from django.urls import path


app_name = "profiles"


routers = DefaultRouter()


routers.register(
    "users",
    UserViewSet,
    basename="users",
)
routers.register(
    "teachers",
    TeacherProfileViewSet,
    basename="teachers",
)
routers.register(
    "students",
    StudentProfileViewSet,
    basename="students",
)


urlpatterns = [
    path("", include(routers.urls)),
]
