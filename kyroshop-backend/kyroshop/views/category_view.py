from rest_framework import viewsets
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly
from rest_framework import filters

from ..models.category import Category
from ..serializers import CategorySerializer


class CategoryView(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    ordering_fields = ['name', 'full_name']
    ordering = ['name']
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({'user': self.request.user})
        return context
