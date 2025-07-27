from rest_framework import viewsets

from kyroshop.models.city import City
from kyroshop.serializers.city_serializer import CitySerializer


class CityView(viewsets.ReadOnlyModelViewSet):
    queryset = City.objects.order_by('name').all()
    serializer_class = CitySerializer

    def get_queryset(self):
        queryset = City.objects.all()
        province_id = self.request.query_params.get('province_id')
        if province_id is not None:
            queryset = queryset.filter(province_id=province_id)
        return queryset