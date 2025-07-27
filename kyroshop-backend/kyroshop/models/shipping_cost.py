DEFAULT_SHIPPING_COST = 10000

class ShippingCost:

    @staticmethod
    def get_shipping_cost(order, address):
        if order.status == order.OrderStatus.SAVED:
            return 0

        return DEFAULT_SHIPPING_COST