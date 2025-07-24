from rest_framework import serializers

from ..models import Order, OrderLine

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
        operation = self.context['operation'] if 'operation' in self.context else 'create'

        sub_total = 0

        # Todo: Add shipping cost functionality
        shipping_cost = 10000
        total = 0
        order_lines_set = validated_data.pop('orderline_set') if 'orderline_set' in validated_data else None

        order = Order.objects.create(
            customer=current_user,
            sub_total=0,
            shipping_cost=shipping_cost,
            total=total,
            **validated_data
        )

        if order_lines_set:
            for order_line_datum in order_lines_set:
                line = OrderLine(order=order, price=0, subtotal=0, **order_line_datum)
                line.calculate_sub_total()
                line.save()
                sub_total += line.subtotal

        order.sub_total = sub_total
        order.total = sub_total + shipping_cost
        order.status = Order.OrderStatus.CHECK_OUT if operation == 'checkout' else Order.OrderStatus.CREATED
        order.save()
        return order