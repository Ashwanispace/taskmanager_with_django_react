from django.urls import path
from . import views

urlpatterns = [
    path('api/simple',views.simpleAPI)
]