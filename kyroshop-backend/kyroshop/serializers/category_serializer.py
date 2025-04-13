from rest_framework import serializers
from ..models import Category
from django.utils.text import slugify
from django.db.models import Q, query


class CategorySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    full_name = serializers.CharField(read_only=True)
    slug = serializers.CharField(read_only=True)
    parent_id = serializers.IntegerField()
    parent = serializers.PrimaryKeyRelatedField(read_only=True)
    created_by = serializers.SlugRelatedField(read_only=True, slug_field='email')
    updated_by = serializers.SlugRelatedField(read_only=True, slug_field='email')

    class Meta:
        model = Category
        fields = ('id', 'name', 'slug', 'full_name', 'is_active', 'parent_id', 'parent', 'created_at', 'created_by',
                  'updated_at', 'updated_by')

    def validate_name(self, value):
        slug = slugify(value)
        q = Q(slug=slug)
        if self.instance:
            q &= ~Q(id=self.instance.id)

        if Category.objects.filter(q).exists():
            raise serializers.ValidationError('Category with same name already exist')
        return value

    def create(self, validated_data):
        current_user = self.context['user']
        validated_data['slug'] = slugify(validated_data['name'])
        return Category.objects.create(**validated_data, created_by=current_user, updated_by=current_user)

    def update(self, instance, validated_data):
        current_user = self.context['user']
        instance.name = validated_data.get('name', instance.name)
        instance.slug = slugify(validated_data.get('name', instance.name))
        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.parent_id = validated_data.get('parent_id', instance.parent_id)
        instance.updated_by = current_user
        instance.save()
        return instance
