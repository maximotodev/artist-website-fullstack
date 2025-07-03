# backend/artist_project/urls.py
from django.contrib import admin
from django.urls import path, include # Make sure 'include' is imported

urlpatterns = [
    path('admin/', admin.site.urls),
    # This line is CRUCIAL. It tells Django that any URL starting with 'api/'
    # should be handled by the 'urls.py' file inside your 'api' app.
    path('api/', include('api.urls')),
]