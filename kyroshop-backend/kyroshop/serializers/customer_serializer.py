from rest_framework import serializers

from ..models.custom_user import CustomUser
from .address_serializer import AddressSerializer

class CustomerSerializer(serializers.ModelSerializer):
    password = serializers.CharField(min_length=6, max_length=100, write_only=True)
    address = AddressSerializer(read_only=True)

    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'first_name', 'last_name', 'full_name', 'username', 'address', 'password', 'birthday',)
