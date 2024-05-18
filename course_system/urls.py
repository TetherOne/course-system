"""
URL configuration for course_system project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

import debug_toolbar
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/authapp/", include("authentication.urls")),
    path("api/userapp/", include("profiles.urls")),
    path("api/courseapp/", include("courses.urls")),
    path("api/questionapp/", include("questions.urls")),
    path("api/checkpointapp/", include("checkpoints.urls")),
    path("api/history/", include("history.urls")),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns.append(re_path(".*", TemplateView.as_view(template_name="index.html")))
urlpatterns = [
    path("__debug__/", include(debug_toolbar.urls)),
] + urlpatterns
