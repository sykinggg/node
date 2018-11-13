from django.conf.urls import include, url
from . import views

urlpatterns = [
    # Examples:
    # url(r'^$', 'myDjango.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url('', views.index, name='index'),
]