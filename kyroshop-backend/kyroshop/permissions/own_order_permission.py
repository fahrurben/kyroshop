from ..models import CustomUser

ALLOWED_PATH  = [
    '/api/orders/checkout',
    '/api/orders/update-method'
]

class OwnOrderPermission:

    def has_permission(self, request, view):
        """ Always has permission, permission check in the query filter by company id"""
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        """ Check if model is allow to access by user """

        if request.user.role == CustomUser.Roles.ADMIN:
            return True

        if request.user.id == obj.customer.id:
            for allowed_path in ALLOWED_PATH:
                if request.path.startswith(allowed_path):
                    return True

        return False