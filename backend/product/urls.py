from django.urls import path
from django.http import JsonResponse
from django.conf import settings
from .views import ListBySearchView,ListProductsView,ListRelatedView,ListSearchView,ProductDetailView


def debug_env(request):
    import os
    return JsonResponse({
        'has_aws_access_key': bool(os.environ.get('AWS_ACCESS_KEY_ID')),
        'has_aws_secret': bool(os.environ.get('AWS_SECRET_ACCESS_KEY')),
        'has_aws_endpoint': bool(os.environ.get('AWS_ENDPOINT_URL_S3')),
        'storages': getattr(settings, 'STORAGES', {}),
        'default_file_storage': getattr(settings, 'DEFAULT_FILE_STORAGE', None),
    })

app_name='product'
urlpatterns = [
    path('debug-env', debug_env),
    path('product/<productId>', ProductDetailView.as_view()),
    path('get-products', ListProductsView.as_view()),
    path('search', ListSearchView.as_view()),
    path('related/<productId>', ListRelatedView.as_view()),
    path('by/search', ListBySearchView.as_view()),
]



