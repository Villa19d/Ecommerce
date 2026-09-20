from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from unittest.mock import patch

User = get_user_model()

class AuthIntegrationTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.signup_data = {
            'first_name': 'Test',
            'last_name': 'User',
            'email': 'testuser@example.com',
            'password': 'strongpassword123',
            're_password': 'strongpassword123'
        }
        self.login_data = {
            'email': 'testuser@example.com',
            'password': 'strongpassword123'
        }

    @patch('djoser.email.ActivationEmail.send')
    def test_user_registration(self, mock_send_email):
        """Test user can register via Djoser API"""
        response = self.client.post('/auth/users/', self.signup_data, format='json')
        
        # Djoser returns 201 Created on successful registration
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['email'], self.signup_data['email'])
        
        # Verify user was created in the database
        user_exists = User.objects.filter(email=self.signup_data['email']).exists()
        self.assertTrue(user_exists)

    def test_user_login(self):
        """Test user can login and receive JWT tokens"""
        # First create the user
        User.objects.create_user(
            email=self.signup_data['email'],
            password=self.signup_data['password'],
            first_name='Test',
            last_name='User'
        )

        # Then attempt to login
        response = self.client.post('/auth/jwt/create/', self.login_data, format='json')
        
        # Should return 200 OK with access and refresh tokens
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_login_invalid_credentials(self):
        """Test login fails with wrong password"""
        User.objects.create_user(
            email=self.signup_data['email'],
            password=self.signup_data['password']
        )

        wrong_data = {
            'email': 'testuser@example.com',
            'password': 'wrongpassword'
        }
        response = self.client.post('/auth/jwt/create/', wrong_data, format='json')
        
        # Should return 401 Unauthorized
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertNotIn('access', response.data)
