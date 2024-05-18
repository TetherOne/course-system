from django.urls import include, path
from rest_framework.routers import DefaultRouter

from profiles.views import StudentProfileViewSet, TeacherProfileViewSet, UserViewSet


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
