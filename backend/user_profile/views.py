from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import UserProfile
from .serializers import UserProfileSerializer


class GetUserProfileView(APIView):
    def get(self, request, format=None):
        try:
            user = self.request.user
            user_profile, created = UserProfile.objects.get_or_create(user=user)
            user_profile = UserProfileSerializer(user_profile)

            profile_data = user_profile.data
            profile_data['first_name'] = user.first_name
            profile_data['last_name'] = user.last_name
            profile_data['email'] = user.email

            return Response(
                {'profile': profile_data},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Something went wrong when retrieving profile'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class UpdateUserProfileView(APIView):
    def put(self, request, format=None):
        try:
            user = self.request.user
            data = self.request.data

            first_name = data.get('first_name', '')
            last_name = data.get('last_name', '')
            address_line_1 = data.get('address_line_1', '')
            address_line_2 = data.get('address_line_2', '')
            city = data.get('city', '')
            state_province_region = data.get('state_province_region', '')
            zipcode = data.get('zipcode', '')
            phone = data.get('phone', '')
            country_region = data.get('country_region', 'Canada')
            birthdate = data.get('birthdate', None)

            # If empty string is passed for birthdate, set it to None
            if birthdate == '':
                birthdate = None

            defaults = {
                'address_line_1': address_line_1,
                'address_line_2': address_line_2,
                'city': city,
                'state_province_region': state_province_region,
                'zipcode': zipcode,
                'phone': phone,
                'country_region': country_region,
                'birthdate': birthdate
            }

            photo = self.request.FILES.get('photo')
            if photo:
                defaults['photo'] = photo

            user_profile, created = UserProfile.objects.update_or_create(
                user=user,
                defaults=defaults
            )

            if first_name and first_name != user.first_name:
                user.first_name = first_name
            if last_name and last_name != user.last_name:
                user.last_name = last_name
            user.save()

            user_profile = UserProfileSerializer(user_profile)
            profile_data = user_profile.data
            profile_data['first_name'] = user.first_name
            profile_data['last_name'] = user.last_name
            profile_data['email'] = user.email

            return Response(
                {'profile': profile_data},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            print("Error updating profile:", e)
            return Response(
                {'error': 'Something went wrong when updating profile'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )