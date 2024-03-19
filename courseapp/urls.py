from rest_framework.routers import DefaultRouter

from courseapp.views import EnrollmentViewSet
from courseapp.views import CourseViewSet
from courseapp.views import LessonViewSet

from django.urls import include
from django.urls import path


app_name = "courseapp"


routers = DefaultRouter()


routers.register(
    "courses",
    CourseViewSet,
    basename="courses",
)
routers.register(
    "lessons",
    LessonViewSet,
    basename="lessons",
)
routers.register(
    "enrollments",
    EnrollmentViewSet,
    basename="enrollments",
)


urlpatterns = [
    path("", include(routers.urls)),
]
