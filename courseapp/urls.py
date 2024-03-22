from rest_framework.routers import DefaultRouter

from courseapp.views import LessonOtherFileViewSet
from courseapp.views import EnrollmentViewSet
from courseapp.views import LessonViewSet
from courseapp.views import CourseViewSet
from courseapp.views import ModuleViewSet

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
