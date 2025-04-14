from rest_framework import serializers
from ..models import Product, Image, Variant, Category
from .category_serializer import CategorySerializer
from django.utils.text import slugify


class ImageSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    product = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Image
        fields = '__all__'


class VariantSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    product = serializers.PrimaryKeyRelatedField(read_only=True)
    is_default = serializers.BooleanField(required=False)
    slug = serializers.CharField(read_only=True)

    class Meta:
        model = Variant
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    slug = serializers.CharField(read_only=True)
    category_id = serializers.IntegerField()
    category = CategorySerializer(read_only=True)
    images = ImageSerializer(required=False, many=True)
    variants = VariantSerializer(required=False, many=True)
    created_by = serializers.SlugRelatedField(read_only=True, slug_field='email')
    updated_by = serializers.SlugRelatedField(read_only=True, slug_field='email')

    class Meta:
        model = Product
        fields = ('id', 'name', 'slug', 'description', 'is_active', 'price', 'category_id', 'category', 'images',
                  'variants', 'created_at', 'created_by', 'updated_at', 'updated_by')

    def create(self, validated_data):
        current_user = self.context['user']

        image_set = validated_data.pop('images') if 'images' in validated_data else None
        variant_set = validated_data.pop('variants') if 'variants' in validated_data else None
        slug = slugify(validated_data.get('name'))
        category = Category.objects.get(id=validated_data.get('category_id'))
        product = Product.objects.create(slug=slug, created_by=current_user, updated_by=current_user, **validated_data)
        product.category = category
        product.save()

        if image_set:
            for image in image_set:
                Image.objects.create(product=product, **image)

        if variant_set:
            for index, variant in enumerate(variant_set):
                is_default = True if index == 0 else False
                variant_slug = slugify(variant.get('name'))
                Variant.objects.create(product=product, slug=variant_slug, is_default=is_default, **variant)

        return product