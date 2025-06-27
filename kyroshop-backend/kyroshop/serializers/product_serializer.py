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
    is_default = serializers.BooleanField(required=False, allow_null=True)
    slug = serializers.CharField(read_only=True)

    class Meta:
        model = Variant
        fields = ('id', 'name', 'slug', 'is_default', 'stock', 'product', 'product_display')


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

    def update(self, instance, validated_data):
        current_user = self.context['user']

        image_set = validated_data.pop('images') if 'images' in validated_data else None
        variant_set = validated_data.pop('variants') if 'variants' in validated_data else None
        slug = slugify(validated_data.get('name'))
        category = Category.objects.get(id=validated_data.get('category_id'))

        instance.name = validated_data.get('name', instance.name)
        instance.slug = slug
        instance.description = validated_data.get('description', instance.description)
        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.price = validated_data.get('price', instance.price)
        instance.category = category
        instance.updated_by = current_user
        instance.save()

        existing_image_ids = instance.images.values_list('id', flat=True)
        update_image_ids = [image_data.get('id') for image_data in image_set if image_data.get('id') is not None]
        deleted_image_ids = set(existing_image_ids).difference(set(update_image_ids))

        if image_set:
            for image_data in image_set:
                image_id = image_data.pop('id')
                if image_id is None or image_id == 0:
                    Image.objects.create(product=instance, **image_data)
                else:
                    image_instance = Image.objects.get(id=image_id)
                    image_instance.filename = image_data.get('filename', image_instance.filename)
                    image_instance.save()

        if len(deleted_image_ids) > 0:
            Image.objects.filter(id__in=list(deleted_image_ids)).delete()

        existing_variant_ids = instance.variants.values_list('id', flat=True)
        update_variant_ids = [variant_data.get('id') for variant_data in variant_set if variant_data.get('id') is not None]
        deleted_variant_ids = set(existing_variant_ids).difference(set(update_variant_ids))

        is_first_new_item = True
        if variant_set:
            for variant_data in variant_set:
                variant_id = variant_data.pop('id')
                if variant_id is None or variant_id == 0:
                    variant_data['is_default'] = True if len(existing_variant_ids) == 0 and is_first_new_item else False
                    Variant.objects.create(product=instance, **variant_data)
                    is_first_new_item = False
                else:
                    variant_instance = Variant.objects.get(id=variant_id)
                    variant_instance.name = variant_data.get('name', variant_instance.name)
                    variant_instance.slug = slugify(variant_data.get('name', variant_instance.name))
                    variant_instance.is_default = variant_data.get('is_default', variant_instance.is_default)
                    variant_instance.stock = variant_data.get('stock', variant_instance.stock)
                    variant_instance.save()

        if len(deleted_variant_ids) > 0:
            Variant.objects.filter(id__in=list(deleted_variant_ids)).delete()

        return instance