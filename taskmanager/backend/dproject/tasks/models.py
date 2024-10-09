from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Task(models.Model):

    PRIORITY_CHOICES = (
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('High', 'High'),
    )

    STATUS_CHOICES = (
        ('To Do', 'To Do'),
        ('In Progress', 'In Progress'),
        ('Completed', 'Completed'),
    )

    owner = models.ForeignKey(User, related_name='tasks', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='Medium')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='To Do')
    due_date = models.DateField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title