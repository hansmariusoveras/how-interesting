from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from how_interesting import views

router = routers.DefaultRouter()
router.register(r'words', views.WordView, 'word')
router.register(r'messages', views.MessageView, 'message')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', views.default),
    re_path('^api/wordmessages/(?P<word>.+)/$', views.MessageList.as_view()),
    path('res/', include('rest_framework.urls')),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    path('get_username', views.GetUsername.as_view())
]