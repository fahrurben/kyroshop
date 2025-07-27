from rest_framework import viewsets

from kyroshop.models.province import Province
from kyroshop.serializers.province_serializer import ProvinceSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class ProvinceView(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Province.objects.order_by('name').all()
    serializer_class = ProvinceSerializer