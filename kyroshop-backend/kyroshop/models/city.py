from django.db import models
from .province import Province

class City(models.Model):
    id = models.CharField(max_length=4, unique=True, primary_key=True)
    type = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    province = models.ForeignKey(Province, on_delete=models.CASCADE)

    def __str__(self):
        return self.name