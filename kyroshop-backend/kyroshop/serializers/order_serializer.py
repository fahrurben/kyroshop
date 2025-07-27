from rest_framework import serializers

from ..models.order import Order
from ..models.order_line import OrderLine

from .customer_serializer import CustomerSerializer
from .product_serializer import VariantSerializer

class OrderLineSerializer(serializers.ModelSerializer):
    variant = VariantSerializer(read_only=True)
    variant_id = serializers.IntegerField()
    price = serializers.DecimalField(read_only=True, max_digits=12, decimal_places=2)
    subtotal = serializers.DecimalField(read_only=True, max_digits=12, decimal_places=2)

    class Meta:
        model = OrderLine
        fields = ('id', 'variant_id', 'variant', 'qty', 'price', 'subtotal')


class OrderSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    customer = CustomerSerializer(read_only=True)
    orderline_set = OrderLineSerializer(many=True)
    sub_total = serializers.DecimalField(read_only=True, max_digits=12, decimal_places=2)
    shipping_cost = serializers.DecimalField(read_only=True, max_digits=12, decimal_places=2)
    total = serializers.DecimalField(read_only=True, max_digits=12, decimal_places=2)

    class Meta:
        model = Order
        fields = (
            'id',
            'customer_id',
            'customer',
            'shipping_method',
            'payment_method',
            'orderline_set',
            'sub_total',
            'shipping_cost',
            'total',
            'status',
            'created_at',
            'updated_at'
        )

    def create(self, validated_data):
        current_user = self.context['user']
        status = self.context['status'] if 'status' in self.context else Order.OrderStatus.SAVED

        order = Order.custom_manager.create_order(validated_data, current_user, status)
        return order

    def update(self, instance, validated_data):
        current_user = self.context['user']

        order = Order.custom_manager.update_order(validated_data, instance, current_user)
        return order

