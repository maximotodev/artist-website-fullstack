// frontend/src/pages/TourPage.js
import React from "react";
import { useApi } from "../hooks/useApi";
import "./PageStyles.css"; // We'll create a shared stylesheet

const TourPage = () => {
  const { data: tourData, loading, error } = useApi("tour/");

  const renderContent = () => {
    if (loading) {
      return <p className="status-message">Loading tour dates...</p>;
    }
    if (error) {
      return <p className="error-message">Error: {error}</p>;
    }
    // Remember, the API is paginated, so our data is in tourData.results
    if (!tourData || tourData.results.length === 0) {
      return (
        <p className="status-message">No upcoming tour dates announced.</p>
      );
    }
    return (
      <ul className="tour-list">
        {tourData.results.map((date) => (
          <li key={date.id} className="tour-item">
            <span className="tour-date">{date.date}</span>
            <span className="tour-city">{date.city}</span>
            <span className="tour-venue">{date.venue}</span>
            <a href="#" className="ticket-link">
              Tickets
            </a>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="page-container">
      <h1 className="page-title">On Tour</h1>
      {renderContent()}
    </div>
  );
};

export default TourPage;
