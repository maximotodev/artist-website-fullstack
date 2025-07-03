# backend/api/serializers.py
from rest_framework import serializers
from .models import TourDate, NewsArticle # Import new models

# --- TourDateSerializer remains the same ---
class TourDateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TourDate
        fields = ['id', 'date', 'city', 'venue']


# --- NEW: NewsArticleSerializer ---
class NewsArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsArticle
        fields = ['id', 'headline', 'content', 'published_date']