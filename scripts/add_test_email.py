import os

with open('backend/backend/urls.py', 'r', encoding='utf-8') as f:
    content = f.read()

new_content = """from django.http import JsonResponse
from django.core.mail import send_mail
from django.conf import settings

def test_email(request):
    try:
        from_email = settings.DEFAULT_FROM_EMAIL
        to_email = request.GET.get('to', from_email)
        send_mail(
            'Prueba de Correo NitroStore',
            'Este es un correo de prueba para verificar que Anymail y Resend están funcionando.',
            from_email,
            [to_email],
            fail_silently=False,
        )
        return JsonResponse({'status': 'success', 'message': f'Correo enviado a {to_email}'})
    except Exception as e:
        return JsonResponse({'status': 'error', 'error_type': str(type(e)), 'error_message': str(e)})

""" + content

new_content = new_content.replace('urlpatterns = [', "urlpatterns = [\n    path('api/test-email/', test_email),")

with open('backend/backend/urls.py', 'w', encoding='utf-8') as f:
    f.write(new_content)
