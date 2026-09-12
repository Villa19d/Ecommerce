from django.db import models
from cart.models import Cart

from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin,BaseUserManager
import os 

class UserAccountManager(BaseUserManager):
    def create_user(self,email,password=None,**extra_fields):
        if not email: 
            raise ValueError('El usuario debe ingresar un email valido')
        email = self.normalize_email(email)
        user = self.model(email=email,**extra_fields)

        user.set_password(password)
        user.save()

        shopping_cart = Cart.objects.create(user=user)
        shopping_cart.save()
        
        return user 
    
    def create_superuser(self,email,password,**extra_fields):
        user = self.create_user(email,password,**extra_fields)

        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user 

class UserAccount(AbstractBaseUser,PermissionsMixin):
    first_name = models.CharField(max_length = 255)
    last_name = models.CharField(max_length = 255)
    email = models.EmailField(max_length=255,unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def getCompleteName(self):
        return self.first_name+ ' '+ self.last_name

    def getShortName(self):
        return self.first_name
    
    def __str__(self) -> str:
        return self.email