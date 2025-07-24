from django.db import models

from .custom_user import CustomUser

class Order(models.Model):
    customer = models.ForeignKey(CustomUser, related_name="orders", on_delete=models.CASCADE)

    class ShippingMethod(models.TextChoices):
        JNE = 'JNE', 'JNE'
        JNT = 'JNT', 'JNT'
    shipping_method = models.CharField(max_length=10, choices=ShippingMethod, default=ShippingMethod.JNE)

    class PaymentMethod(models.TextChoices):
        BANK_TRANSFER = 'BANK_TRANSFER', 'Bank Transfer'
    payment_method = models.CharField(max_length=20, choices=PaymentMethod, default=PaymentMethod.BANK_TRANSFER)

    sub_total = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    shipping_cost = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    class OrderStatus(models.TextChoices):
        CHECK_OUT = 'CHECK_OUT', 'Check Out'
        CREATED = 'CREATED', 'Created'
        PAID = 'PAID', 'Paid'
        SENT = 'SENT', 'Sent'
        RECEIVED = 'RECEIVED', 'Received'
        RETURNED = 'RETURNED', 'Returned'
        DONE = 'DONE', 'Done'
    status = models.CharField(max_length=10, choices=OrderStatus, default=OrderStatus.CREATED)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)