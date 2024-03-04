from courseapp.views import TeacherProfilesViewSet, teacher_profiles, courses_list, teacher
from courseapp.views import CoursesViewSet

from rest_framework.routers import DefaultRouter

from django.urls import include, re_path
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
    path('platform/', teacher_profiles),
    path('courses/', courses_list),
    path('teacher/<int:id>', teacher)
]
