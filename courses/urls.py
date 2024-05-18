from django.urls import include, path
from rest_framework.routers import DefaultRouter

from courses.views import (
    CourseViewSet,
    EnrollmentViewSet,
    LessonOtherFileViewSet,
    LessonViewSet,
    ModuleViewSet,
)


app_name = "courses"


routers = DefaultRouter()


routers.register(
    "courses",
    CourseViewSet,
    basename="courses",
)
routers.register(
    "modules",
    ModuleViewSet,
    basename="modules",
)
routers.register(
    "lessons",
    LessonViewSet,
    basename="lessons",
)
routers.register(
    "lesson-other-files",
    LessonOtherFileViewSet,
    basename="lesson-other-files",
)
routers.register(
    "enrollments",
    EnrollmentViewSet,
    basename="enrollments",
)


urlpatterns = [
    path("", include(routers.urls)),
]
