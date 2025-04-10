from django.db import models
from django.contrib.auth import get_user_model
from .custom_user import CustomUser


class Address(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    fullname = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=12)
    address = models.CharField(max_length=1000)
    province = models.CharField(max_length=2)
    city = models.CharField(max_length=2)
    postal_code = models.CharField(max_length=5)

    def __str__(self):
        return self.user.first_name + " " + self.user.last_name + " Address"
