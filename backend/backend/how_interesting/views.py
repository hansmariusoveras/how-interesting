from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import WordSerializer, WordSerializer
from .models import Word

# Create your views here.
class WordView(viewsets.ModelViewSet):
    serializer_class = WordSerializer
    queryset = Word.objects.all()

def default(request):
    return HttpResponse("")