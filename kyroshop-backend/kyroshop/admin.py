from django.contrib import admin

from .models import CustomUser
from .models.category import Category
from .models.product import Product
from .models.upload_image_model import UploadImageModel

admin.site.register(CustomUser)
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(UploadImageModel)
