from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),  # Include your app-specific URLs
    path('api/auth/register/', CreateUserView.as_view(), name='register'),  # User registration
    path('api/auth/token/', TokenObtainPairView.as_view(), name='get_token'),  # Token obtain
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='refresh'),  # Token refresh
]
