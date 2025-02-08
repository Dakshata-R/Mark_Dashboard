import React from "react";
import "../style.css";

const Hero = () => {
  return (
    <div className="hero">
      <img
        src="https://source.unsplash.com/1600x800/?nature"
        alt="Hero"
        className="hero-image"
      />
      <h1 className="hero-title">Welcome to My Long Scroll Page</h1>
      <p className="hero-description">
        Scroll down to explore different sections.
      </p>
    </div>
  );
};

export default Hero;
