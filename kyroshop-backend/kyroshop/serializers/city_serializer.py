from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import serializers
from ..models import City

class CitySerializer(serializers.ModelSerializer):
    permission_classes = [IsAuthenticatedOrReadOnly]

    class Meta:
        model = City
        fields = '__all__'