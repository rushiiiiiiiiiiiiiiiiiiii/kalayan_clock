// components/PlanetMarker.jsx
import React from "react";

const PlanetMarker = ({  image, label }) => {
  return (
    <>
     

      <div
        style={{
          width: "20px",
          height: "20px",
        }}
      >
        <img
          src={image}
          alt={label}
          title={label}
          style={{ width: "100%", height: "100%", borderRadius: '100%' }}
        />
      </div>
    </>
  );
};

export default PlanetMarker;
