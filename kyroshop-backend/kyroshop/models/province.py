from django.db import models

class Province(models.Model):
    id = models.CharField(max_length=4, unique=True, primary_key=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
