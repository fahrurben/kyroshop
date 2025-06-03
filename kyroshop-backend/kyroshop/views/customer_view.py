from rest_framework.views import APIView, Response, status
from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from ..serializers import CustomerSerializer
from ..models import CustomUser

class CustomerView(viewsets.ReadOnlyModelViewSet):
    serializer_class = CustomerSerializer
    queryset = CustomUser.objects.filter(role=CustomUser.Roles.CUSTOMER).all()
    permission_classes = [IsAdminUser]