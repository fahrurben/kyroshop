from django.contrib import admin

from kyroshop.models import CustomUser, Category, Product, UploadImageModel

admin.site.register(CustomUser)
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(UploadImageModel)
