from django.contrib.auth.models import AbstractUser

from typing import TYPE_CHECKING

from django.db.models import Manager
from django.db import models


class CustomUser(AbstractUser):

    email = models.EmailField(unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    class Meta:
        verbose_name = "пользователь"
        verbose_name_plural = "пользователи"

    if TYPE_CHECKING:
        objects: Manager
