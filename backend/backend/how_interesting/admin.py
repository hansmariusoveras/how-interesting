from django.contrib import admin
from .models import Word, Message

# Register your models here.
class WordAdmin(admin.ModelAdmin):
    list_display = ('word', 'count')

class MessageAdmin(admin.ModelAdmin):
    list_display = ('author', 'time', 'text', 'word')

admin.site.register(Word, WordAdmin)
admin.site.register(Message, MessageAdmin)