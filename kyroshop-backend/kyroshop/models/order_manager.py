from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.apps import apps
from ..models.shipping_cost import ShippingCost

class OrderManager(models.Manager):

    def create_order(self, validated_data, current_user, status):
        """
            Create order.
        """
        sub_total = 0

        total = 0
        order_lines_set = validated_data.pop('orderline_set') if 'orderline_set' in validated_data else None

        order = self.create(
            customer=current_user,
            sub_total=0,
            shipping_cost=0,
            total=total,
            status=status,
            **validated_data
        )

        order_line_type = ContentType.objects.get(app_label='kyroshop', model='orderline')
        OrderLineModel = order_line_type.model_class()

        if order_lines_set:
            for order_line_datum in order_lines_set:
                line = OrderLineModel(order=order, price=0, subtotal=0, **order_line_datum)
                line.calculate_sub_total()
                line.calculate_total_weight()
                line.save()
                sub_total += line.subtotal

        shipping_cost = ShippingCost.get_shipping_cost(order, current_user.address)

        order.sub_total = sub_total
        order.shipping_cost = shipping_cost
        order.total = sub_total + shipping_cost
        order.save()
        return order

    def update_order(self, instance, validated_data, current_user):
        order_line_type = ContentType.objects.get(app_label='kyroshop', model='orderline')
        OrderLineModel = order_line_type.model_class()

        sub_total = 0

        total = 0
        order_lines_set = validated_data.pop('orderline_set') if 'orderline_set' in validated_data else []

        existing_order_ids = instance.orderline_set.all().values_list('id',flat=True)
        update_order_ids = [order_line.get('id') for order_line in order_lines_set if order_line.get('id') is not None]
        deleted_order_ids = set(existing_order_ids).difference(set(update_order_ids))

        if order_lines_set:
            for order_line in order_lines_set:
                order_id = order_line.get('id')
                if order_id is None or order_id == 0:
                    line = OrderLineModel(order=instance, price=0, subtotal=0, **order_line)
                    line.calculate_sub_total()
                    line.save()
                    line.calculate_total_weight()
                    sub_total += line.subtotal
                else:
                    OrderLineModel.objects.get(id=order_id).update(**order_line)
                    line = OrderLineModel.objects.get(id=order_id)
                    line.calculate_sub_total()
                    line.calculate_total_weight()
                    line.save()
                    sub_total += line.subtotal

        if len(deleted_order_ids) > 0:
            OrderLineModel.objects.filter(id__in=list(deleted_order_ids)).delete()

        instance.shipping_method = validated_data.get('shipping_method', instance.shipping_method)
        instance.payment_method = validated_data.get('payment_method', instance.payment_method)
        instance.sub_total = sub_total

        shipping_cost = ShippingCost.get_shipping_cost(instance, current_user.address)
        instance.shipping_cost = shipping_cost
        instance.total = instance.sub_total + shipping_cost
        instance.save()

        return instance

    def update_order_method(self, instance, validated_data):
        instance.shipping_method = validated_data.get('shipping_method', instance.shipping_method)
        instance.payment_method = validated_data.get('payment_method', instance.payment_method)
        shipping_cost = ShippingCost.get_shipping_cost(instance, instance.customer.address)
        instance.shipping_cost = shipping_cost
        instance.total = instance.sub_total + shipping_cost
        instance.save()

        return instance

    def submit_order(self, instance, validated_data):
        instance.shipping_method = validated_data.get('shipping_method', instance.shipping_method)
        instance.payment_method = validated_data.get('payment_method', instance.payment_method)
        shipping_cost = ShippingCost.get_shipping_cost(instance, instance.customer.address)
        instance.shipping_cost = shipping_cost
        instance.total = instance.sub_total + shipping_cost
        instance.status = self.model.OrderStatus.CREATED
        instance.save()

        return instance