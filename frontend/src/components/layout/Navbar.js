import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <NavLink to="/">ALYSSA GREY</NavLink>
      </div>
      <div className="nav-links">
        <NavLink to="/music" className="nav-link">
          MUSIC
        </NavLink>
        <NavLink to="/tour" className="nav-link">
          TOUR
        </NavLink>
        <NavLink to="/videos" className="nav-link">
          VIDEOS
        </NavLink>
        <NavLink to="/news" className="nav-link">
          NEWS
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
