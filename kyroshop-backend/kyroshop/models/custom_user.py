from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext as _


class CustomUser(AbstractUser):
    email = models.EmailField(_('email address'), unique=True)

    class Types(models.TextChoices):
        ADMIN = "ADMIN", "Admin"
        CUSTOMER = "CUSTOMER", "Customer"

    type = models.CharField(max_length=10, choices=Types, default=Types.CUSTOMER)
    birthday = models.DateField(_('birthday'))

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('username', 'birthday')

    def __str__(self):
        return self.email

    @staticmethod
    def create(username, email, password, birthday):
        user = CustomUser.objects.create_user(username, email, password, birthday=birthday)
        return user
