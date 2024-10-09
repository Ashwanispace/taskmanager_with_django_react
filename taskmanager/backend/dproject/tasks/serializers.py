# tasks/serializers.py

from rest_framework import serializers
from .models import Task
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class TaskSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Task
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'tasks']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    password2 = serializers.CharField(write_only=True, required=True, label='Confirm password', style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['username', 'password', 'password2']
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Passwords must match."})
        return attrs
    
    def create(self, validated_data):
        user = User.objects.create_user(username=validated_data['username'], password=validated_data['password'])
        return user

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims if needed
        token['username'] = user.username
        return token
