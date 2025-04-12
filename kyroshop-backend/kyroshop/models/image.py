from django.db import models
from .product import Product


class Image(models.Model):
    product = models.ForeignKey(Product, related_name="images", on_delete=models.CASCADE)
    filename = models.CharField(max_length=255)

    def __str__(self):
        return self.filename
