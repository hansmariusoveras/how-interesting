from django.db import models

# Create your models here.

class Word(models.Model):
    word = models.CharField(max_length=20, primary_key=True)
    count = models.PositiveBigIntegerField()

    def _str_(self):
        return self.word