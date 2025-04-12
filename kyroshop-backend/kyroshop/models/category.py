from django.db import models
from .custom_user import CustomUser


class Category(models.Model):
    name = models.CharField(max_length=255)
    slug = models.CharField(max_length=255)
    is_active = models.BooleanField()
    parent = models.ForeignKey("Category", null=True, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(CustomUser, related_name="category_creates", on_delete=models.CASCADE)
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(CustomUser, related_name="category_updates", null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
