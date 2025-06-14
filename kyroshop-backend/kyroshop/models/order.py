from django.db import models

from .custom_user import CustomUser

class Order(models.Model):
    customer = models.ForeignKey(CustomUser, related_name="orders", on_delete=models.CASCADE)

    class OrderStatus(models.TextChoices):
        CREATED = 'CREATED', 'Created'
        PAID = 'PAID', 'Paid'
        SENT = 'SENT', 'Sent'
        RECEIVED = 'RECEIVED', 'Received'
        RETURNED = 'RETURNED', 'Returned'
        DONE = 'DONE', 'Done'

    total = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=10, choices=OrderStatus, default=OrderStatus.CREATED)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)