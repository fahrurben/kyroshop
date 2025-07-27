from rest_framework import serializers
from ..models.province import Province

class ProvinceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Province
        fields = '__all__'