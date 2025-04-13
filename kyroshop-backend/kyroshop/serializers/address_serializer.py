from rest_framework import serializers
from ..models import Address
from django.utils.text import slugify
from django.db.models import Q, query


class AddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address
        fields = "__all__"