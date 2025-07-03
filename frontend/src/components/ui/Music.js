// frontend/src/components/ui/Music.js

import React from "react"; // Removed unused imports: useState, useRef, useEffect
import { useApi } from "../../hooks/useApi";
import "./Music.css";

// --- Skeleton Loader Component (no changes) ---
const SkeletonLoader = () => (
  <div className="tracks-grid">
    {Array.from({ length: 10 }).map((_, i) => (
      <div key={i} className="skeleton-card"></div>
    ))}
  </div>
);

// --- Track Card Component (Refactored) ---
// This component is now much simpler. It's a "presentational" component
// that just displays the track info it's given.
const TrackCard = ({ track }) => {
  // Removed props: onPlay, isPlaying
  // Removed all logic related to audio playback (useRef, useEffect)

  return (
    <div className="track-card">
      <div className="album-art-wrapper">
        <a
          href={track.spotify_url}
          target="_blank"
          rel="noopener noreferrer"
          title={`Listen to ${track.name} on Spotify`}
        >
          <img src={track.album_cover} alt={track.name} className="album-art" />
        </a>
      </div>
      <div className="track-info">
        {/* The track name is the only info shown now */}
        <p className="track-name">{track.name}</p>
        {/* The entire audio player section and conditional logic have been removed */}
      </div>
    </div>
  );
};

// --- Main Music Component (Refactored) ---
function Music({ artistId }) {
  const {
    data: tracks,
    loading,
    error,
  } = useApi(`music/top-tracks/${artistId}/`);

  // Removed all state and handler functions related to audio playback.

  const renderContent = () => {
    if (loading) {
      return <SkeletonLoader />;
    }
    if (error) {
      return <p className="error-message">Error: {error}</p>;
    }
    if (!tracks || tracks.length === 0) {
      return (
        <p className="status-message">No top tracks found for this artist.</p>
      );
    }
    return (
      <div className="tracks-grid">
        {/* The props for audio playback have been removed from the TrackCard call */}
        {tracks.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>
    );
  };

  return (
    <div className="music-container">
      {/* <h2>Top Tracks on Spotify</h2> */}
      {renderContent()}
    </div>
  );
}

export default Music;
