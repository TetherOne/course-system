from apiapp.views import TeacherProfilesView

from django.urls import path



app_name = 'apiapp'


urlpatterns = [
    path('teacher-profiles/', TeacherProfilesView.as_view(), name='teacher-profiles'),
]
