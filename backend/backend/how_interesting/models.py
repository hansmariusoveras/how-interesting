from re import T
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class Word(models.Model):
    word = models.CharField(max_length=20, primary_key=True)

    def __str__(self):
        return self.word

class Message(models.Model):
    author = models.ForeignKey('RegistredUser', related_name='messages', on_delete=models.CASCADE)
    text = models.CharField(max_length=240)
    time = models.DateTimeField(auto_now_add=True)
    word = models.ForeignKey(Word, on_delete=models.CASCADE)

    def __str__(self):
        return self.text

class RegistredUser(AbstractUser):
    words = models.ManyToManyField(Word)