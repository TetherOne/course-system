from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.tokens import AccessToken


class JWTRefreshMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):

        if request.user.is_authenticated:

            access_token = AccessToken(request.auth)

            if access_token.is_expired():

                refresh_view = TokenRefreshView()
                refresh_response = refresh_view.post(request)

                if refresh_response.status_code == 200:

                    new_access_token = refresh_response.data.get('access')
                    request.auth = new_access_token

        response = self.get_response(request)

        return response