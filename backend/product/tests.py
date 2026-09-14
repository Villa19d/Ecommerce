from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from .models import Product, Category

class ProductViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.category = Category.objects.create(name='Electronics')
        self.category2 = Category.objects.create(name='Clothing')
        
        self.product1 = Product.objects.create(
            name='Laptop',
            price=1000.00,
            compare_price=1200.00,
            category=self.category,
            quantity=10,
            sold=2
        )
        self.product2 = Product.objects.create(
            name='T-Shirt',
            price=20.00,
            compare_price=25.00,
            category=self.category2,
            quantity=50,
            sold=5
        )

    def test_list_products(self):
        """Test getting product list works and select_related is efficient"""
        url = '/api/product/get-products'
        
        # We can use assertNumQueries to ensure select_related prevents N+1
        # The query count should be stable regardless of product count
        # 1 query for products + related category
        with self.assertNumQueries(1):
            response = self.client.get(url, {'sortBy': 'date_created', 'order': 'desc', 'limit': 6})
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('products', response.data)
        self.assertEqual(len(response.data['products']), 2)
        
    def test_get_product_detail(self):
        """Test getting product details returns correct format"""
        url = f'/api/product/product/{self.product1.id}'
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('product', response.data)
        self.assertEqual(response.data['product']['name'], 'Laptop')
        self.assertEqual(float(response.data['product']['price']), 1000.00)

    def test_search_products(self):
        """Test searching products"""
        url = '/api/product/search'
        response = self.client.post(url, {'search': 'laptop', 'category_id': '0'})
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['search_products']), 1)
        self.assertEqual(response.data['search_products'][0]['name'], 'Laptop')
