from django.urls import include, path
from rest_framework.routers import DefaultRouter


app_name = "history"


routers = DefaultRouter()


urlpatterns = [
    path("", include(routers.urls)),
]