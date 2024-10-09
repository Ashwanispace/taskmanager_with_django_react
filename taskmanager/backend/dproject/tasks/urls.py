# tasks/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, RegisterView, MyTokenObtainPairViewCustom
from rest_framework_simplejwt.views import TokenRefreshView

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')
router.register(r'auth', RegisterView, basename='auth')

urlpatterns = [
    path('', include(router.urls)),
    path('token/', MyTokenObtainPairViewCustom.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]