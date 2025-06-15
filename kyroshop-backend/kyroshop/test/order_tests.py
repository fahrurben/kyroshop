from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
import datetime
from rest_framework_simplejwt.tokens import AccessToken
from django.utils.text import slugify

from ..models import CustomUser, Category, Product, Variant, Order

class OrderTests(APITestCase):

    def setUp(self):
        self.user = CustomUser.objects.create_superuser(
            'admin',
            'admin@test.com',
            'secret123',
            role=CustomUser.Roles.ADMIN,
            birthday=datetime.datetime.now()
        )
        self.category = Category.objects.create(name='test', is_active=True, created_by= self.user)
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

    def test_create_order(self):
        url = reverse('order')
        data = {
            'orderline_set': [
                { 'variant_id': self.variant.id, 'qty': 1 }
            ]
        }
        response = self.client.post(url, data, format='json')
        latest_order = Order.objects.last()
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(latest_order.orderline_set.count(), 1)
        order = latest_order.orderline_set.first()
        self.assertEqual(order.price, 1000)
        self.assertEqual(order.qty, 1)
        self.assertEqual(order.subtotal, 1000)
        self.assertEqual(latest_order.total, 1000)