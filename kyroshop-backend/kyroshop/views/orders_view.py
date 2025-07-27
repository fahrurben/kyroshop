from rest_framework.views import Response, status
from rest_framework.mixins import (CreateModelMixin,
                                   ListModelMixin,
                                   RetrieveModelMixin,
                                   UpdateModelMixin,
                                   DestroyModelMixin)
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.viewsets import GenericViewSet

from ..models.order import Order
from ..serializers.order_serializer import OrderSerializer
from ..permissions.own_order_permission import OwnOrderPermission

class OrdersView(CreateModelMixin,
                 ListModelMixin,
                 RetrieveModelMixin,
                 UpdateModelMixin,
                 DestroyModelMixin,
                 GenericViewSet
                 ):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated, OwnOrderPermission]
    ordering_fields = ['id']
    ordering = ['id']

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user'] = self.request.user
        return context

    @action(detail=False,methods=['post'],url_name='checkout')
    def checkout(self, request, *args, **kwargs):
        serializer = OrderSerializer(
            data=request.data,
            context={'user': self.request.user, 'status': Order.OrderStatus.CHECK_OUT}
        )
        if serializer.is_valid():
            order = serializer.create(serializer.validated_data)
            order_serializer = OrderSerializer(instance=order)
            return Response(order_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

