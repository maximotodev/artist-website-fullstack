# backend/api/models.py
from django.db import models

# --- TourDate model remains the same ---
class TourDate(models.Model):
    date = models.DateField()
    city = models.CharField(max_length=100)
    venue = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.date} - {self.city}"


# --- NEW: NewsArticle Model ---
class NewsArticle(models.Model):
    headline = models.CharField(max_length=255)
    content = models.TextField()
    published_date = models.DateField(auto_now_add=True) # Automatically sets the date on creation

    class Meta:
        ordering = ['-published_date'] # Show newest articles first

    def __str__(self):
        return self.headline