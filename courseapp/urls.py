from courseapp.views import TeacherProfilesViewSet, teacher_profiles
from courseapp.views import CoursesViewSet

from rest_framework.routers import DefaultRouter

from django.urls import include
from django.urls import path


app_name = 'courseapp'


routers = DefaultRouter()
routers.register(
    'courses',
    CoursesViewSet,
)
routers.register(
    'teacher-profiles',
    TeacherProfilesViewSet,
)


urlpatterns = [
    path('api/', include(routers.urls)),
    path('platform/', teacher_profiles)
]
