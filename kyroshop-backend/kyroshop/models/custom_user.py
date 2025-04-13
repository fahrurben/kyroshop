from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext as _


class CustomUser(AbstractUser):
    email = models.EmailField(_('email address'), unique=True)

    class Roles(models.TextChoices):
        ADMIN = "ADMIN", "Admin"
        CUSTOMER = "CUSTOMER", "Customer"

    role = models.CharField(max_length=10, choices=Roles, default=Roles.CUSTOMER)
    birthday = models.DateField(_('birthday'))

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('username', 'role', 'birthday')

    def __str__(self):
        return self.email

    @staticmethod
    def create(username, email, password, **kwargs):
        user = CustomUser.objects.create_user(username, email, password, **kwargs)
        return user
