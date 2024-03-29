from django.contrib.auth.views import LoginView

from django.urls import path

from authapp.views import logout_view, AboutMeView, RegisterView

app_name = "authapp"



urlpatterns = [
    path('login/', LoginView.as_view(template_name='authapp/login.html', redirect_authenticated_user=True,), name='login'),
    path('logout/', logout_view, name='logout'),
    path('about_me/', AboutMeView.as_view(template_name='authapp/about_me.html'), name='about_me'),
    path('register/', RegisterView.as_view(template_name='authapp/register.html'), name='register'),
]
