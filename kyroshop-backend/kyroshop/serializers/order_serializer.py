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
        status = self.context['status'] if 'status' in self.context else Order.OrderStatus.SAVED

        sub_total = 0

        # Todo: Add shipping cost functionality
        shipping_cost = 10000

        if status == Order.OrderStatus.SAVED:
            shipping_cost = 0

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
        order.status = status
        order.save()
        return order

    def update(self, instance, validated_data):
        current_user = self.context['user']

        sub_total = 0

        # Todo: Add shipping cost functionality
        shipping_cost = 10000

        if instance.status == Order.OrderStatus.SAVED:
            shipping_cost = 0

        total = 0
        order_lines_set = validated_data.pop('orderline_set') if 'orderline_set' in validated_data else None

        existing_order_ids = instance.orderline_set.value_list('id', flat=True)
        update_order_ids = [order_line.get('id') for order_line in order_lines_set if order_line.get('id') is not None]
        deleted_order_ids = set(existing_order_ids).difference(set(update_order_ids))

        if order_lines_set:
            for order_line in order_lines_set:
                order_id = order_line.pop('id')
                if order_id is None or order_id == 0:
                    line = OrderLine(order=instance, price=0, subtotal=0, **order_line)
                    line.calculate_sub_total()
                    line.save()
                    sub_total += line.subtotal
                else:
                    OrderLine.objects.get(id=order_id).update(**order_line)
                    line = OrderLine.objects.get(id=order_id)
                    line.calculate_sub_total()
                    line.save()
                    sub_total += line.subtotal

        if len(deleted_order_ids) > 0:
            OrderLine.objects.filter(id__in=list(deleted_order_ids)).delete()

        instance.shipping_method = validated_data.get('shipping_method', instance.shipping_method)
        instance.payment_method = validated_data.get('payment_method', instance.payment_method)
        instance.sub_total = sub_total
        instance.total = sub_total + shipping_cost
        instance.save()

        return instance

