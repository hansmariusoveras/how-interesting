from rest_framework import serializers
from .models import RegistredUser, Word, Message

class WordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = ('word')

class MessageSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    class Meta:
        model = Message
        fields = ('author', 'time', 'text', 'word')
        read_only_fields =('author',)
        
        

class RegistredUserSerializer(serializers.ModelSerializer):
    messages = serializers.PrimaryKeyRelatedField(many=True, queryset=Message.objects.all())
    words = WordSerializer(read_only=True, many=True)
    class Meta:
        model = RegistredUser
        fields = ('id', 'username', 'messages', 'words')