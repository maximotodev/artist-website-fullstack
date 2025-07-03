# backend/api/admin.py
from django.contrib import admin
from .models import TourDate, NewsArticle # Import our models

# Register your models here to make them accessible in the admin panel
admin.site.register(TourDate)
admin.site.register(NewsArticle)