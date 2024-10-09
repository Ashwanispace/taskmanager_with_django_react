# tasks/views.py

from rest_framework import viewsets, permissions
from .models import Task
from .serializers import TaskSerializer, RegisterSerializer, MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(owner=self.request.user).order_by('due_date')

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class RegisterView(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=['post'])
    def register(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'status': 'User registered successfully.'})
        else:
            return Response(serializer.errors, status=400)

class MyTokenObtainPairViewCustom(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

