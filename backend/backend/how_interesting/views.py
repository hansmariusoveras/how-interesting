from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import viewsets, generics

from rest_framework import permissions
from .serializers import WordSerializer, MessageSerializer
from .models import Word, Message

# Create your views here.
class WordView(viewsets.ModelViewSet):
    serializer_class = WordSerializer
    queryset = Word.objects.all()

class MessageView(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    queryset = Message.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


def default(request):
    return HttpResponse("")

class MessageList(generics.ListAPIView):
    model = Message
    serializer_class = MessageSerializer

    def get_queryset(self):
        word = self.kwargs['word']
        return Message.objects.filter(word=word)