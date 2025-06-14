from rest_framework.permissions import IsAdminUser
from rest_framework.viewsets import ModelViewSet

from ..models import Order
from ..serializers.order_serializer import OrderSerializer

class OrdersView(ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAdminUser]
    ordering_fields = ['id']
    ordering = ['id']
