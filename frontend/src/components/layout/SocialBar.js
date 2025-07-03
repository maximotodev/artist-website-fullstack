import React from "react";
import {
  FaInstagram,
  FaTwitter,
  FaTiktok,
  FaYoutube,
  FaSpotify,
} from "react-icons/fa";
import "./SocialBar.css";

const SocialBar = () => {
  return (
    <div className="social-bar">
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <FaInstagram />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <FaTwitter />
      </a>
      <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
        <FaTiktok />
      </a>
      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
        <FaYoutube />
      </a>
      <a href="https://spotify.com" target="_blank" rel="noopener noreferrer">
        <FaSpotify />
      </a>
    </div>
  );
};

export default SocialBar;
