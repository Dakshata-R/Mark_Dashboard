import React from "react";
import "../style.css";

const Content = () => {
  return (
    <div className="content">
      {[...Array(10)].map((_, index) => (
        <section key={index} className="content-section">
          <h2>Section {index + 1}</h2>
          <p>
            This is section {index + 1}. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Praesent volutpat justo ut consectetur euismod.
            Vestibulum eget dui id lorem faucibus euismod.
          </p>
          <button className="section-button">Learn More</button>
        </section>
      ))}
    </div>
  );
};

export default Content;
