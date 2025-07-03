# backend/api/urls.py
from django.urls import path
from .views import (
    TourDateListView,
    SpotifyTopTracksView,
    NewsArticleListView,
    YouTubeVideosView  # Import the new view
)

urlpatterns = [
    path('tour/', TourDateListView.as_view(), name='tour-list'),
    path('music/top-tracks/<str:artist_id>/', SpotifyTopTracksView.as_view(), name='spotify-top-tracks'),
    path('news/', NewsArticleListView.as_view(), name='news-list'),

    # Replace the old 'videos/' path with this new one
    path('youtube-videos/', YouTubeVideosView.as_view(), name='youtube-videos'),
]