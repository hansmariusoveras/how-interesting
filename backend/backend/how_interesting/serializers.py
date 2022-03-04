from rest_framework import serializers
from .models import Word, Message
from django.contrib.auth.models import User

class WordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = ('word', 'count')

class MessageSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    class Meta:
        model = Message
        fields = ('author', 'time', 'text', 'word')
        read_only_fields =('author',)
        
        

class UserSerializer(serializers.ModelSerializer):
    messages = serializers.PrimaryKeyRelatedField(many=True, queryset=Message.objects.all())
    class Meta:
        model = User
        fields = ('id', 'username', 'messages')