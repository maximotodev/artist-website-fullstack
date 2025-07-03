# backend/api/views.py
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
import requests

from .models import TourDate, NewsArticle
from .serializers import TourDateSerializer, NewsArticleSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from django.conf import settings
from django.core.cache import cache # Import the cache

# --- TourDateListView remains the same ---
class TourDateListView(generics.ListAPIView):
    queryset = TourDate.objects.all().order_by('date')
    serializer_class = TourDateSerializer


# --- NEW: NewsArticleListView ---
class NewsArticleListView(generics.ListAPIView):
    queryset = NewsArticle.objects.all() # The ordering is handled by the model's Meta class
    serializer_class = NewsArticleSerializer
# --- REFACTORED SpotifyTopTracksView ---
class SpotifyTopTracksView(APIView):
    def get_spotify_token(self):
        """
        Retrieves the Spotify access token from cache or gets a new one.
        """
        token = cache.get('spotify_access_token')
        if token:
            return token

        # If not in cache, get a new one
        auth_url = 'https://accounts.spotify.com/api/token'
        auth_response = requests.post(auth_url, {
            'grant_type': 'client_credentials',
            'client_id': settings.SPOTIFY_CLIENT_ID,
            'client_secret': settings.SPOTIFY_CLIENT_SECRET,
        })
        auth_data = auth_response.json()
        new_token = auth_data.get('access_token')
        
        if new_token:
            # Cache the token for 55 minutes (3300 seconds). Spotify tokens last 60 mins.
            cache.set('spotify_access_token', new_token, timeout=3300)
        
        return new_token

    def get(self, request, artist_id, *args, **kwargs):
        access_token = self.get_spotify_token()
        if not access_token:
            return Response({"error": "Spotify authentication failed"}, status=500)

        headers = {'Authorization': f'Bearer {access_token}'}
        tracks_url = f'https://api.spotify.com/v1/artists/{artist_id}/top-tracks?market=US'
        tracks_response = requests.get(tracks_url, headers=headers)

        if tracks_response.status_code != 200:
            return Response({"error": "Failed to fetch tracks from Spotify. Check the artist ID."}, status=tracks_response.status_code)

        tracks_data = tracks_response.json()
        
        formatted_tracks = []
        for track in tracks_data.get('tracks', []):
            formatted_tracks.append({
                'id': track['id'], # Add track ID for key prop and audio control
                'name': track['name'],
                'album_cover': track['album']['images'][0]['url'] if track['album']['images'] else None,
                'preview_url': track['preview_url'],
                'spotify_url': track['external_urls']['spotify'],
            })

        return Response(formatted_tracks)
    
# NEW VIEW TO FETCH FROM YOUTUBE
class YouTubeVideosView(APIView):
    def get(self, request, *args, **kwargs):
        api_key = settings.YOUTUBE_API_KEY
        channel_handle = "@NessaBarrett"

        if not api_key:
            return Response({"error": "YouTube API key not configured."}, status=500)

        # --- 1. Find the Channel ID ---
        print("--- 1. Searching for Channel ID ---")
        search_url = f"https://www.googleapis.com/youtube/v3/search?part=snippet&q={channel_handle}&type=channel&key={api_key}"
        search_response = requests.get(search_url).json()
        print("YOUTUBE API RESPONSE FOR CHANNEL SEARCH:", search_response) # DEBUG PRINT

        if not search_response.get('items'):
            return Response({"error": f"YouTube channel with handle '{channel_handle}' not found."}, status=404)
        
        channel_id = search_response['items'][0]['id']['channelId']
        print(f"Found Channel ID: {channel_id}") # DEBUG PRINT

        # --- 2. Get the Uploads Playlist ID ---
        print("\n--- 2. Searching for Uploads Playlist ID ---")
        channels_url = f"https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id={channel_id}&key={api_key}"
        channels_response = requests.get(channels_url).json()
        print("YOUTUBE API RESPONSE FOR PLAYLISTS:", channels_response) # DEBUG PRINT

        uploads_playlist_id = channels_response['items'][0]['contentDetails']['relatedPlaylists']['uploads']
        print(f"Found Uploads Playlist ID: {uploads_playlist_id}") # DEBUG PRINT

        # --- 3. Get videos from the playlist ---
        print("\n--- 3. Getting Videos from Playlist ---")
        playlist_items_url = f"https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId={uploads_playlist_id}&maxResults=5&key={api_key}"
        playlist_response = requests.get(playlist_items_url).json()
        print("YOUTUBE API RESPONSE FOR VIDEOS:", playlist_response) # FINAL DEBUG PRINT

        # --- 4. Format the data to match our frontend's expectation ---
        videos = []
        for item in playlist_response.get('items', []):
            snippet = item.get('snippet', {})
            videos.append({
                'id': snippet.get('resourceId', {}).get('videoId'),
                'title': snippet.get('title'),
                'youtube_id': snippet.get('resourceId', {}).get('videoId'),
                'published_date': snippet.get('publishedAt'),
            })
            
        # IMPORTANT: Unlike our old views, this one isn't paginated by Django,
        # so we return the list directly, not inside a "results" object.
        return Response(videos)