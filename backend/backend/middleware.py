from django.http import JsonResponse
import traceback

class ExceptionLoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        return self.get_response(request)

    def process_exception(self, request, exception):
        return JsonResponse({
            'error': str(type(exception)),
            'message': str(exception),
            'traceback': traceback.format_exc()
        }, status=500)
