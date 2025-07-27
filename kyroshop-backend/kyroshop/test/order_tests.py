from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
import datetime
from rest_framework_simplejwt.tokens import AccessToken
from django.utils.text import slugify

from ..models import CustomUser
from ..models.category import Category
from ..models.product import Product
from ..models.variant import Variant
from ..models.order import Order
from ..models.address import Address

class OrderTests(APITestCase):

    def setUp(self):
        self.user = CustomUser.objects.create_user(
            'user',
            'user@test.com',
            'secret123',
            role=CustomUser.Roles.CUSTOMER,
            birthday=datetime.datetime.now()
        )
        self.category = Category.objects.create(name='test', is_active=True, created_by= self.user)
        Address.objects.create(
            user=self.user,
            fullname='John Doe',
            phone_number='123',
            address='101 Street',
            province='11',
            city='11',
            postal_code='123',
        )
        product = Product.objects.create(
            name='test',
            category=self.category,
            slug = slugify('test'),
            price = 1000,
            is_active= True,
            created_by= self.user,
        )
        self.product = product
        variant = Variant.objects.create(
            product= product,
            name= 'test',
            slug= slugify('test'),
            is_default= True,
            stock= 1000,
        )
        self.variant = variant

        self.token = str(AccessToken.for_user(self.user))
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')

    def test_save_order(self):
        url = reverse('order-save')
        data = {
            'orderline_set': [
                { 'variant_id': self.variant.id, 'qty': 1 }
            ]
        }
        response = self.client.post(url, data, format='json')
        latest_order = Order.objects.last()
        self.assertEqual(latest_order.customer, self.user)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(latest_order.orderline_set.count(), 1)
        order_line = latest_order.orderline_set.first()
        self.assertEqual(order_line.price, 1000)
        self.assertEqual(order_line.qty, 1)
        self.assertEqual(order_line.subtotal, 1000)
