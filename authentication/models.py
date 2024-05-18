from typing import TYPE_CHECKING

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import Manager
from django.utils.translation import gettext_lazy as _


class CustomUser(AbstractUser):

    email = models.EmailField(_("почта"), unique=True)
    username = models.CharField(_("никнейм"), max_length=30, unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    class Meta:
        db_table = "users"
        verbose_name = "пользователь"
        verbose_name_plural = "пользователи"

    if TYPE_CHECKING:
        objects: Manager
