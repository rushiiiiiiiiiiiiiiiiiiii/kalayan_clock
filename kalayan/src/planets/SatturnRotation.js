import React, { useEffect, useState } from "react";
import PlanetMaker from "../components/PlanetMaker";
import saturnImage from "../assets/images/shani-01.png"; // Replace with correct Saturn image path
import dialpositioner from "./dialposition.js";

const SaturnRotation = ({ isVisible = true, rotation ,mandal}) => {
  const [saturnRotation, setSaturnRotation] = useState(0);
  const [apiConfig, setApiConfig] = useState(null);

  const applyTimeBasedRotation = (initialRotation, refrence) => {
    const now = new Date();

    // Get 5:30 AM today
    const start = new Date(now);
    start.setHours(5, 30, 0, 0);

    // If now is before 5:30 AM, use 5:30 AM of previous day
    if (now < start) {
      start.setDate(start.getDate() - 1);
    }

    // Total seconds in 24 hours 7
    const totalSeconds = 24 * 3600;

    // Time passed since last 5:30 AM
    const secondsSinceStart = (now.getTime() - start.getTime()) / 1000;

    // Rotation since 5:30 AM
    const rotationSinceStart = (secondsSinceStart / totalSeconds) * 360;

    // Final rotation = saved rotation + time-based rotation
    const finalRotation = (initialRotation + rotationSinceStart) % 360;
 
      // setSaturnRotation(refrence-finalRotation - 90)
    //    if (refrence - finalRotation - 90 > 0) {
    //   setSaturnRotation(refrence - finalRotation - 90)
    // }
    // else {
    //   setSaturnRotation(finalRotation - refrence - 90)

    // }
    setSaturnRotation(mandal-initialRotation-90 );



      

  };
  useEffect(() => {
    applyTimeBasedRotation(parseFloat(rotation?.[0].Shani), parseFloat(rotation?.[0].Nakshatra_mandal))
  }, [rotation])
  if (!isVisible) return null;

  return (
    <>
      <style>
        {`
      @keyframes revolveSaturn {
        from {
          transform: rotate(${saturnRotation}deg) translateY(-240px);
        }
        to {
          transform: rotate(${saturnRotation + 360}deg) translateY(-240px);
        }
      }z  
    `}
      </style>
      <div
        style={{

          position: "absolute",
          top: "29%",
          left: "50%",
          transform: `translate(-50%, -50%) translateY(-240px)`,
          animation: `revolveSaturn  86400s linear infinite`, // 24h rotation

        }}
      >
        <PlanetMaker
          rotationAngle={saturnRotation}
          image={saturnImage}
          label="Saturn"
        />
      </div>
    </>
  );
};

export default SaturnRotation;
