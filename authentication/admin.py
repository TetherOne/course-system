from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from authentication.models import CustomUser


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):

    list_display = (
        "id",
        "username",
        "email",
        "first_name",
        "last_name",
        "is_staff",
        "is_active",
    )
    list_filter = (
        "is_staff",
        "is_active",
    )
    search_fields = (
        "username",
        "email",
        "first_name",
        "last_name",
    )
    ordering = ("-id",)
