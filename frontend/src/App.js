import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import SocialBar from "./components/layout/SocialBar";
import HomePage from "./pages/HomePage";
import MusicPage from "./pages/MusicPage";
import TourPage from "./pages/TourPage";
import NotFoundPage from "./pages/NotFoundPage";
// Import your other page components here
import VideosPage from "./pages/VideosPage";
import NewsPage from "./pages/NewsPage";

import "./App.css";

// This component defines the consistent layout for all pages
const AppLayout = () => (
  <>
    <Navbar />
    <SocialBar />
    <main>
      {/* The Outlet is where the routed page component will be rendered */}
      <Outlet />
    </main>
  </>
);

function App() {
  // NOTE: All previous data fetching logic has been removed from here.
  // It now belongs inside the specific page components (e.g., TourPage).
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="music" element={<MusicPage />} />
          <Route path="tour" element={<TourPage />} />
          <Route path="videos" element={<VideosPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
