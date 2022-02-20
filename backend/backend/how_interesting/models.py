from re import T
from django.db import models

# Create your models here.

class Word(models.Model):
    word = models.CharField(max_length=20, primary_key=True)
    count = models.PositiveBigIntegerField()

    def __str__(self):
        return self.word

class Message(models.Model):
    author = models.ForeignKey('auth.User', related_name='messages', on_delete=models.CASCADE)
    text = models.CharField(max_length=240)
    time = models.DateTimeField(auto_now_add=True)
    word = models.ForeignKey(Word, on_delete=models.CASCADE)

    def __str__(self):
        return self.text
