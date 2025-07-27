from rest_framework import serializers
from ..models.custom_user import CustomUser


class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=100)
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    password = serializers.CharField(max_length=100, min_length=6)
    birthday = serializers.DateField()

    def validate_email(self, value):
        is_exists = CustomUser.objects.filter(email__iexact=value).exists()
        if is_exists:
            raise serializers.ValidationError("Email already registered")
        return value

    def create(self, validated_data):
        email = validated_data.pop('email')
        first_name = validated_data.pop('first_name')
        last_name = validated_data.pop('last_name')
        password = validated_data.pop('password')

        user = CustomUser.create(email, email, password,
                                 first_name=first_name,
                                 last_name=last_name,
                                 role=CustomUser.Roles.CUSTOMER,
                                 birthday=validated_data['birthday'])
        return user
