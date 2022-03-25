from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import viewsets, generics

from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from .permissions import IsUser
from .serializers import RegistredUserSerializer, WordSerializer, MessageSerializer
from .models import RegistredUser, Word, Message
from django.contrib.auth.models import User


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

class UserDetail(generics.RetrieveAPIView):
    queryset = RegistredUser.objects.all()
    serializer_class = RegistredUserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class GetUsername(APIView):
    def get(self, request, format=None):
        return Response(data={'username': self.request.user.username})

class AddWordMember(APIView):
    permission_classes = [IsUser]
    def post(self, request, format=None):
        user = RegistredUser.objects.get(username=self.request.user.username)
        user.words.add(request.data['word'])
        return Response(data={request.data['word']})

class UserWords(APIView):
    def get(self, request, format=None):
        user = RegistredUser.objects.get(username=self.request.user.username)
        return Response(data={w.word : w.registreduser_set.count() for w in user.words.all()})