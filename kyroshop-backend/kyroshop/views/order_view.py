from rest_framework.mixins import CreateModelMixin
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated

from ..models import Order
from ..serializers.order_serializer import OrderSerializer

class OrderView(GenericAPIView, CreateModelMixin):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user'] = self.request.user
        return context

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)