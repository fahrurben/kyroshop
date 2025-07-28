from ..models import CustomUser
from django.urls import reverse
from rest_framework import permissions

ALLOWED_VIEW  = [
    'order-update-method',
    'order-submit-order',
    'order-cancel',
]

class OwnOrderPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        """ Always has permission, permission check in the query filter by company id"""
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        """ Check if model is allow to access by user """
        if request.user.role == CustomUser.Roles.ADMIN:
            return True

        if request.user.id == obj.customer.id:
            for allowed_view in ALLOWED_VIEW:
                if request.get_full_path() == reverse(allowed_view, args=[obj.id]):
                    return True

        return False