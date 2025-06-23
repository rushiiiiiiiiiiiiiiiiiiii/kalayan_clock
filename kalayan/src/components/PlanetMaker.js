// components/PlanetMarker.jsx
import React from "react";

const PlanetMarker = ({ rotationAngle, image, label }) => {
  console.log(rotationAngle)
  return (
    <>
      <style>
        {`
      @keyframes revolve {
        from {
          transform: rotate(0deg) translateY(-240px);
        }
        to {
          transform: rotate(360deg) translateY(-240px);
        }
      }
    `}
      </style>

      <div
        style={{  
          width: "20px",
          height: "20px",
          position: "absolute",
          top: "29%",
          left: "50%",
          transform: `translate(-50%, -50%) translateY(-240px)`,
          animation: `revolve ${rotationAngle}s linear infinite`, // 24h rotation

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
