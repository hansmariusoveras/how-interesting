from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from how_interesting import views

router = routers.DefaultRouter()
router.register(r'words', views.WordView, 'word')
router.register(r'messages', views.MessageView, 'message')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', views.default),
    re_path('^api/wordmessages/(?P<word>.+)/$', views.MessageList.as_view()),
    path('res/', include('rest_framework.urls'))
]