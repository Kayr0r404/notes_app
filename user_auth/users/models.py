from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(unique=True, max_length=100)
    fullname = models.CharField(max_length=100)
    bio = models.TextField(null=True, blank=True)
    avatar = models.URLField(
        default="https://www.gravatar.com/avatar/?d=mp", null=True, blank=True
    )

    # Use email as the login field instead of username
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "password", "fullname"]

    class Meta:
        db_table = "users"


class Note(models.Model):
    description = models.CharField(max_length=300)
    content = models.TextField(null=False, default="")
    owner = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="notes"
    )

    class Meta:
        db_table = "notes"
