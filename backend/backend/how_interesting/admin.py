from django.contrib import admin
from .models import Word, Message, RegistredUser
from django.contrib.auth.admin import UserAdmin

# Register your models here.
class WordAdmin(admin.ModelAdmin):
    list_display = ('word',)

class MessageAdmin(admin.ModelAdmin):
    list_display = ('author', 'time', 'text', 'word')

class RegistredUserAdmin(UserAdmin):
    list_display = ('username', 'get_words')

    def get_words(self, obj):
        return ', '.join([w.word for w in obj.words.all()])

admin.site.register(Word, WordAdmin)
admin.site.register(Message, MessageAdmin)
admin.site.register(RegistredUser, RegistredUserAdmin)