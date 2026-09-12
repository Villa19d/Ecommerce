from django.contrib import admin
from django.urls import path,include,re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static 
from django.views.static import serve  # Importa esta función



"""
*urlpatterns:
   Es una lista que contiene todas las rutas (URLs) de tu aplicación. Django usa esta lista para determinar qué vista (función o clase) debe ejecutarse cuando un usuario visita una URL específica.

*path('auth/', include('djoser.urls')):
   path() es una función de Django que define una ruta URL.

*'auth/'
   es la ruta base. Cualquier URL que comience con auth/ será manejada por las rutas definidas en djoser.urls.

*include('djoser.urls') 
   incluye las rutas definidas en el paquete djoser. Djoser es una biblioteca de Django que proporciona endpoints para manejar la autenticación de usuarios, como registro, inicio de sesión, recuperación de contraseña, etc.

*path('auth/', include('djoser.urls.jwt')):
   Similar al anterior, pero aquí se incluyen las rutas específicas para la autenticación basada en JWT (JSON Web Tokens). JWT es un estándar para la autenticación stateless, comúnmente usado en aplicaciones modernas.

*path('auth/', include('djoser.social.urls')):
   Aquí se incluyen las rutas para la autenticación social (por ejemplo, usando Google, Facebook, etc.). Djoser proporciona endpoints para manejar la autenticación a través de proveedores de redes sociales.

*path('api/category/', include('category.urls')):
   Esta línea define que todas las URLs que comienzan con api/category/ serán manejadas por las rutas definidas en el archivo category.urls. Esto es útil para modularizar tu aplicación y separar las rutas por funcionalidades.

*path('api/product/', include('product.urls')):
   Similar al anterior, pero para las rutas relacionadas con productos. Las URLs que comienzan con api/product/ serán manejadas por el archivo product.urls.

*path('admin/', admin.site.urls):
   Esta línea define la ruta para el panel de administración de Django. Cuando visites http://tudominio.com/admin/, accederás al panel de administración de Django, donde puedes gestionar los modelos de tu base de datos.

+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT):
    Esta parte del código se encarga de servir archivos multimedia (como imágenes, videos, etc.) durante el desarrollo.

*settings.MEDIA_URL es la URL base para los archivos multimedia (por ejemplo, /media/).

*settings.MEDIA_ROOT es la ruta en el sistema de archivos donde se almacenan los archivos multimedia.

*static() es una función de Django que permite servir archivos estáticos y multimedia durante el desarrollo."""
urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),

    path('api/category/', include('category.urls')),
    path('api/product/', include('product.urls')),
    path('api/shipping/', include('shipping.urls')),

    
    path('api/cart/', include('cart.urls')),

    path('api/payment/', include('payment.urls')),
    path('api/orders/', include('orders.urls')),
    path('api/reviews/', include('reviews.urls')),
    path('api/wishlist/', include('wishlist.urls')),
    path('api/coupons/', include('coupons.urls')),
    path('api/profile/', include('user_profile.urls')),

    path('admin/', admin.site.urls),

    # Agrega esta línea para servir archivos media en desarrollo
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)


urlpatterns += [re_path(r'^.*',TemplateView.as_view(template_name='index.html'))]