from django.db import models
from .custom_user import CustomUser
from .category import Category


class Product(models.Model):
    name = models.CharField(max_length=255, unique=True)
    slug = models.CharField(max_length=255, unique=True)
    description = models.TextField(default='')
    is_active = models.BooleanField()
    price = models.DecimalField(max_digits=12, decimal_places=2)
    category = models.ForeignKey(Category, related_name="products", on_delete=models.CASCADE)

    seo_title = models.CharField(max_length=255, null=True, blank=True)
    seo_description = models.CharField(max_length=1000, null=True, blank=True)
    seo_keywords = models.TextField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(CustomUser, related_name="product_creates", on_delete=models.CASCADE)
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(CustomUser, related_name="product_updates", null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.slug
