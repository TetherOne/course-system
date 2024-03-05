from rest_framework.routers import DefaultRouter

from courseapp.views import TeacherProfilesViewSet
from courseapp.views import CoursesViewSet
from courseapp.views import teachers_list
from courseapp.views import courses_list

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
    path('courses/', courses_list),
    path('teacher/<int:id>', teachers_list)
]
