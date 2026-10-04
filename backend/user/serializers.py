from djoser.serializers import UserCreateSerializer, SendEmailResetSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model 
from django.conf import settings
User = get_user_model()

class CustomSendEmailResetSerializer(SendEmailResetSerializer):
    def get_user(self, is_active=True):
        try:
            user = User.objects.get(
                **{self.email_field: self.validated_data.get(self.email_field)}
            )
            # Removemos la restricción de user.has_usable_password() 
            # para que los usuarios de Google/GitHub también puedan pedir reset
            if user.is_active == is_active:
                return user
        except User.DoesNotExist:
            pass
        if (
            settings.PASSWORD_RESET_SHOW_EMAIL_NOT_FOUND
            or settings.USERNAME_RESET_SHOW_EMAIL_NOT_FOUND
        ):
            self.fail("email_not_found")

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = (
            'id',
            'first_name',
            'last_name',
            'email',
            'password',
            'getCompleteName',
            'getShortName',
            'photo'
        )