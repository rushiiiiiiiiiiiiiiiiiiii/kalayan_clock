// components/PlanetMarker.jsx
import React from "react";

const PlanetMarker = ({ rotationAngle, image, label }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: `translate(-50%, -50%) rotate(${rotationAngle}deg) translateY(-240px)`,
        transition: "transform 0.2s linear",
      }}
    >
      <img
        src={image}
        alt={label}
        title={label}
        style={{ width: "30px", height: "30px" ,borderRadius:'70%' }}
      />
    </div>
  );
};

export default PlanetMarker;
