"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from rest_framework.routers import DefaultRouter
from api.views import AddressViewSet, RentalItemView,UserRegisterView,BookingView,UserViewSet
from rest_framework.authtoken.views import obtain_auth_token

router = DefaultRouter()
router.register(r'register', UserRegisterView, basename='user_register')
router.register(r'users', UserViewSet, basename='user')
router.register(r"addresses", AddressViewSet, basename="address")
router.register(r"rental-items", RentalItemView, basename="rentalitem")
router.register(r'bookings', BookingView, basename='booking')


urlpatterns = [
    path("admin/", admin.site.urls),
    path("token", obtain_auth_token),
] + router.urls+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
