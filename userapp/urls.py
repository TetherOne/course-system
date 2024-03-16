from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

from rest_framework.routers import DefaultRouter

from userapp.views import StudentProfileViewSet
from userapp.views import TeacherProfileViewSet
from userapp.views import UserViewSet

from django.urls import include
from django.urls import path


app_name = "userapp"


routers = DefaultRouter()


routers.register(
    "users",
    UserViewSet,
)
routers.register(
    "teachers",
    TeacherProfileViewSet,
)
routers.register(
    "students",
    StudentProfileViewSet,
)


urlpatterns = [
    path("", include(routers.urls)),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
