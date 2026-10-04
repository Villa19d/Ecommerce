from django.urls import path
from django.http import JsonResponse
from .models import Product
from .views import ListBySearchView,ListProductsView,ListRelatedView,ListSearchView,ProductDetailView

def fix_photo(request):
    products = Product.objects.filter(name__icontains='DeathAdder')
    if products.exists():
        product = products.first()
        product.photo = 'photos/2024/09/razer_blade_14.jpg'
        product.save()
        return JsonResponse({'status': 'fixed', 'product': product.name})
    return JsonResponse({'status': 'not found'})

app_name='product'
urlpatterns = [
    path('fix-photo', fix_photo),
    path('product/<productId>', ProductDetailView.as_view()),
    path('get-products', ListProductsView.as_view()),
    path('search', ListSearchView.as_view()),
    path('related/<productId>', ListRelatedView.as_view()),
    path('by/search', ListBySearchView.as_view()),
]



