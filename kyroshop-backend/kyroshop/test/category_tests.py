from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
import datetime
from ..models import Category
from ..models import CustomUser
from rest_framework_simplejwt.tokens import AccessToken
class CategoryTests(APITestCase):

    def setUp(self):
        self.user = CustomUser.objects.create_superuser(
            'admin',
            'admin@test.com',
            'secret123',
            role=CustomUser.Roles.ADMIN,
            birthday=datetime.datetime.now()
        )
        self.token = str(AccessToken.for_user(self.user))
        self.category = Category.objects.create(name="test", is_active=True, created_by=self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')

    def test_create_category(self):
        """
        Ensure we can create a new category object.
        """
        url = reverse('category-list')
        data = { "name": "test1", "parent_id": None, "is_active": True }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Category.objects.count(), 2)
        category = Category.objects.last()
        self.assertEqual(category.name, 'test1')
        self.assertEqual(category.is_active, True)

    def test_update_category(self):
        """
        Ensure we can update category
        """
        url = reverse('category-detail', args=[1])
        data = {"name": "test updated", "parent_id": None, "is_active": True}
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        category = Category.objects.last()
        self.assertEqual(category.name, 'test updated')
        self.assertEqual(category.is_active, True)

    def test_get_category(self):
        """
        Ensure we can get category
        """
        url = reverse('category-detail', args=[1])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        category = Category.objects.last()
        self.assertEqual(category.name, 'test')
        self.assertEqual(category.is_active, True)

    def test_delete_category(self):
        """
        Ensure we can delete category
        """
        url = reverse('category-detail', args=[1])
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        category_count = Category.objects.count()
        self.assertEqual(category_count, 0)