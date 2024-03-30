from rest_framework.routers import DefaultRouter

from userapp.views import StudentProfileViewSet
from userapp.views import TeacherProfileViewSet
from userapp.views import UserViewSet

from django.urls import include
from django.urls import path


app_name = "userapp"


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
