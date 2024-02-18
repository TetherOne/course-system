from courseapp.views import main_page

from django.urls import path



app_name = 'courseapp'


urlpatterns = [
    path('main/', main_page, name='main-page'),
]
