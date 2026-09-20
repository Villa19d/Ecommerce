from social_core.backends.google import GoogleOAuth2
from social_core.backends.github import GithubOAuth2

class StatelessGoogleOAuth2(GoogleOAuth2):
    """Custom Google OAuth2 backend that disables state verification.
    This is required for decoupled frontend/backend JWT setups to avoid CORS/Session issues."""
    STATE_PARAMETER = False

    def get_redirect_uri(self, state=None):
        """Override get_redirect_uri to use dynamic URI from request or fallback to settings."""
        request = getattr(self.strategy, 'request', None)
        if request:
            redirect_uri = request.GET.get('redirect_uri') or request.POST.get('redirect_uri')
            if redirect_uri:
                return redirect_uri
        return self.setting('REDIRECT_URI')

class StatelessGithubOAuth2(GithubOAuth2):
    """Custom Github OAuth2 backend that disables state verification."""
    STATE_PARAMETER = False

    def get_redirect_uri(self, state=None):
        """Override get_redirect_uri to use dynamic URI from request or fallback to settings."""
        request = getattr(self.strategy, 'request', None)
        if request:
            redirect_uri = request.GET.get('redirect_uri') or request.POST.get('redirect_uri')
            if redirect_uri:
                return redirect_uri
        return self.setting('REDIRECT_URI')
        
    def get_user_id(self, details, response):
        """Ensure uid is a string to prevent MySQL/Django type mismatch in get_social_auth"""
        return str(super().get_user_id(details, response))
