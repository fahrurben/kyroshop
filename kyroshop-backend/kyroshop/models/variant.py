from django.db import models
from .product import Product
from .custom_user import CustomUser


class Variant(models.Model):
    product = models.ForeignKey(Product, related_name="variants", on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    slug = models.CharField(max_length=255)
    is_default = models.BooleanField()
    stock = models.IntegerField()

    def __str__(self):
        return self.slug
