from django.db import models

from .order import Order
from .variant import Variant

class OrderLine(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    variant = models.ForeignKey(Variant, on_delete=models.CASCADE)
    qty = models.IntegerField()
    price = models.DecimalField(max_digits=12, decimal_places=2)
    subtotal = models.DecimalField(max_digits=12, decimal_places=2)
    total_weight = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    def calculate_sub_total(self):
        self.price = self.variant.product.price
        subtotal = self.qty * self.price
        self.subtotal = subtotal

    def calculate_total_weight(self):
        product_weight = self.variant.product.weight
        self.total_weight = self.qty * product_weight