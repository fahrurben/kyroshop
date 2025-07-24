from rest_framework.views import Response, status
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.viewsets import GenericViewSet

from ..models import Order
from ..serializers.order_serializer import OrderSerializer

class OrdersView(CreateModelMixin, GenericViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    ordering_fields = ['id']
    ordering = ['id']

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user'] = self.request.user
        return context

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    @action(detail=False,methods=['post'])
    def checkout(self, request, *args, **kwargs):
        serializer = OrderSerializer(
            data=request.data,
            context={'user': self.request.user, 'operation': 'checkout'}
        )
        if serializer.is_valid():
            order = serializer.create(serializer.validated_data)
            order_serializer = OrderSerializer(instance=order)
            return Response(order_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

