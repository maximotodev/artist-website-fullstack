import React from "react";
import "./Hero.css";
import bgVideo from "../../assets/videos/background-video.mp4";

const Hero = () => {
  return (
    <div className="hero-container">
      <video className="hero-video" autoPlay loop muted>
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* You can add overlay content here if you want */}
      {/* e.g., <div className="hero-content"><h1>New Album Out Now</h1></div> */}
    </div>
  );
};

export default Hero;
