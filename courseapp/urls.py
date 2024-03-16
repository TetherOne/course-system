from rest_framework.routers import DefaultRouter

from courseapp.views import EnrollmentViewSet
from courseapp.views import CourseViewSet
from courseapp.views import LessonViewSet

from django.urls import include
from django.urls import path


app_name = "courseapp"


routers = DefaultRouter()


routers.register(
    "enrollments",
    EnrollmentViewSet,
)
routers.register(
    "courses",
    CourseViewSet,
)
routers.register(
    "lessons",
    LessonViewSet,
)


urlpatterns = [
    path("", include(routers.urls)),
]
