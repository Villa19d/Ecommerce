from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from product.models import Product, Category
from cart.models import Cart, CartItem
from unittest.mock import patch, MagicMock

User = get_user_model()

class PaymentTotalViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email='test@example.com',
            password='testpassword',
            first_name='Test',
            last_name='User'
        )
        self.client.force_authenticate(user=self.user)
        
        self.category = Category.objects.create(name='Electronics')
        self.product1 = Product.objects.create(
            name='Laptop',
            price=1000.00,
            compare_price=1200.00,
            category=self.category,
            quantity=10,
            sold=0
        )
        self.product2 = Product.objects.create(
            name='Mouse',
            price=50.00,
            compare_price=60.00,
            category=self.category,
            quantity=50,
            sold=0
        )
        
        # User cart is created automatically on user creation due to signals/model overrides in this project
        self.cart = Cart.objects.get(user=self.user)

    def test_get_payment_total_with_empty_cart(self):
        """Test getting payment total when cart is empty returns 404"""
        url = '/api/payment/get-payment-total'
        response = self.client.get(url, {'shipping_id': '1', 'coupon_name': ''})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], 'Need to have items in cart')

    def test_get_payment_total_success(self):
        """Test getting payment total with valid cart items calculates correctly"""
        CartItem.objects.create(cart=self.cart, product=self.product1, count=1)
        CartItem.objects.create(cart=self.cart, product=self.product2, count=2)
        
        url = '/api/payment/get-payment-total'
        response = self.client.get(url, {'shipping_id': '0', 'coupon_name': ''})
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # 1 laptop (1000) + 2 mice (100) = 1100
        # tax = 1100 * 0.18 = 198
        # Total = 1298
        self.assertEqual(float(response.data['original_price']), 1100.00)
        self.assertEqual(float(response.data['estimated_tax']), 198.00)
        self.assertEqual(float(response.data['total_amount']), 1298.00)
        self.assertEqual(float(response.data['total_compare_amount']), 1320.00)

    def test_get_payment_total_out_of_stock(self):
        """Test validation catches out of stock items"""
        # Product1 has quantity 10, trying to buy 11
        CartItem.objects.create(cart=self.cart, product=self.product1, count=11)
        
        url = '/api/payment/get-payment-total'
        response = self.client.get(url, {'shipping_id': '0', 'coupon_name': ''})
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['error'], 'Not enough items in stock')

class ProcessPaymentViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email='test@example.com',
            password='testpassword',
            first_name='Test',
            last_name='User'
        )
        self.client.force_authenticate(user=self.user)
        self.cart = Cart.objects.get(user=self.user)

    @patch('payment.views.gateway.transaction.sale')
    def test_process_payment_mocked_gateway(self, mock_sale):
        """Test processing payment triggers braintree gateway correctly"""
        # Set up a mock successful transaction
        mock_result = MagicMock()
        mock_result.is_success = True
        mock_result.transaction.id = "mocked_transaction_id"
        mock_sale.return_value = mock_result
        
        url = '/api/payment/make-payment'
        data = {
            'nonce': 'fake-valid-nonce',
            'shipping_id': '0',
            'coupon_name': '',
            'full_name': 'Test User',
            'address_line_1': '123 Test St',
            'address_line_2': '',
            'city': 'Test City',
            'state_province_region': 'Test State',
            'postal_zip_code': '12345',
            'country_region': 'US',
            'telephone_number': '5551234567'
        }
        
        # Test empty cart fails
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
