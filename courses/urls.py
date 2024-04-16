from courses.views import LessonOtherFileViewSet
from courses.views import EnrollmentViewSet
from courses.views import LessonViewSet
from courses.views import CourseViewSet
from courses.views import ModuleViewSet

from rest_framework.routers import DefaultRouter

from django.urls import include
from django.urls import path


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
