from ..models import CustomUser

ALLOWED_PATH  = [
    '/api/orders/checkout'
]

class OwnOrderPermission:

    def has_permission(self, request, view):
        """ Always has permission, permission check in the query filter by company id"""
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        """ Check if model is allow to access by user """

        if request.user.role == CustomUser.Roles.ADMIN:
            return True

        print(request.path)
        if request.user.id == obj.customer.id and request.path in ALLOWED_PATH:
            return True

        return False