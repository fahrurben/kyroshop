from rest_framework import serializers

from ..models.custom_user import CustomUser
from .address_serializer import AddressSerializer


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(min_length=6, max_length=100, write_only=True)
    address = AddressSerializer(read_only=True)

    class Meta:
        model = CustomUser
        fields = ('email', 'username', 'address', 'password', 'birthday', )
