from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from how_interesting import views

router = routers.DefaultRouter()
router.register(r'words', views.WordView, 'word')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', views.default)
]
