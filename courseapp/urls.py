from courseapp.views import main_page, CoursesViewSet, TeacherProfilesViewSet

from django.urls import path, include
from rest_framework.routers import DefaultRouter

app_name = 'courseapp'


routers = DefaultRouter()
routers.register('courses', CoursesViewSet,)
routers.register('teacher-profiles', TeacherProfilesViewSet,)


urlpatterns = [
    path('main/', main_page, name='main-page'),
    path('api/', include(routers.urls)),
]
