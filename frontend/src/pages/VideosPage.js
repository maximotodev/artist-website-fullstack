// frontend/src/pages/VideosPage.js
import React from "react";
import { useApi } from "../hooks/useApi"; // Your custom hook
import "./PageStyles.css";

const VideosPage = () => {
  // Change the endpoint from 'videos/' to our new 'youtube-videos/' endpoint
  const { data: videos, loading, error } = useApi("youtube-videos/");

  const renderContent = () => {
    if (loading) {
      return <p className="status-message">Loading videos from YouTube...</p>;
    }
    if (error) {
      return <p className="error-message">Error: {error}</p>;
    }
    // IMPORTANT: Our new view returns an array directly, so we use `videos`
    // instead of `videos.results`.
    if (!videos || videos.length === 0) {
      return (
        <p className="status-message">
          No videos found on the YouTube channel.
        </p>
      );
    }
    return (
      <div className="video-grid">
        {videos.map((video) => (
          <div key={video.id} className="video-card">
            <div className="video-embed">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtube_id}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <h3 className="video-title">{video.title}</h3>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Videos</h1>
      {renderContent()}
    </div>
  );
};

export default VideosPage;
