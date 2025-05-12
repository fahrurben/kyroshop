from rest_framework import serializers
from ..models import CustomUser, Address


class ProfileSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    password = serializers.CharField(required=False, write_only=True)
    birthday = serializers.DateField()
    fullname = serializers.CharField(max_length=255)
    phone_number = serializers.CharField(max_length=12)
    address = serializers.CharField(max_length=1000)
    province = serializers.CharField(max_length=2)
    city = serializers.CharField(max_length=2)
    postal_code = serializers.CharField(max_length=5)

    def create(self, validated_data):
        current_user = CustomUser.objects.get(id=self.context['user'].id)

        current_user.first_name = validated_data.get('first_name', current_user.first_name)
        current_user.last_name = validated_data.get('last_name', current_user.last_name)
        if 'password' in validated_data:
            current_user.password = validated_data.get('password', current_user.password)
        current_user.birthday = validated_data.get('birthday', current_user.birthday)
        current_user.save()

        current_address = Address.objects.filter(user=current_user).first()
        if current_address is None:
            current_address = Address()

        current_address.fullname = validated_data.get('fullname', current_address.fullname)
        current_address.phone_number = validated_data.get('phone_number', current_address.phone_number)
        current_address.address = validated_data.get('address', current_address.address)
        current_address.province = validated_data.get('province', current_address.province)
        current_address.city = validated_data.get('city', current_address.city)
        current_address.postal_code = validated_data.get('postal_code', current_address.postal_code)
        current_address.save()
        return current_user
