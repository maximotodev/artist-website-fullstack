// frontend/src/pages/NewsPage.js
import React from "react";
import { useApi } from "../hooks/useApi";
import "./PageStyles.css"; // Use our shared stylesheet

const NewsPage = () => {
  // Use our custom hook to fetch data from the 'news/' endpoint
  const { data: newsData, loading, error } = useApi("news/");

  // This function conditionally renders content based on the API state
  const renderContent = () => {
    if (loading) {
      return <p className="status-message">Loading latest news...</p>;
    }
    if (error) {
      return <p className="error-message">Error: {error}</p>;
    }
    // Access the .results array from the paginated API response
    if (!newsData || newsData.results.length === 0) {
      return <p className="status-message">No news to report at the moment.</p>;
    }
    return (
      <div className="news-list">
        {newsData.results.map((article) => (
          <article key={article.id} className="news-article-card">
            <header>
              <h2 className="news-headline">{article.headline}</h2>
              <p className="news-date">
                Published on:{" "}
                {new Date(article.published_date).toLocaleDateString()}
              </p>
            </header>
            <p className="news-content">{article.content}</p>
          </article>
        ))}
      </div>
    );
  };

  return (
    <div className="page-container">
      <h1 className="page-title">News</h1>
      {renderContent()}
    </div>
  );
};

export default NewsPage;
