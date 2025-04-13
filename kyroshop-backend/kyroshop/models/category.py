from django.db import models
from .custom_user import CustomUser


class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)
    slug = models.CharField(max_length=255, unique=True)
    is_active = models.BooleanField()
    parent = models.ForeignKey('Category', null=True, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(CustomUser, related_name='category_creates', on_delete=models.CASCADE)
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(CustomUser, related_name='category_updates', null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    @property
    def full_name(self):
        full_name = ''
        parent = self.parent
        while parent is not None:
            full_name += parent.name + ' > '
            parent = parent.parent

        return self.name if full_name == '' else f"{full_name}{self.name}"
