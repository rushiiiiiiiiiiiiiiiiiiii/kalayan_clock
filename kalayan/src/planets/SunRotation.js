import React, { useEffect, useState } from "react";
import PlanetMarker from "../components/PlanetMaker.js";
import sunImage from "../assets/images/sun.png"; // Adjust path if needed
import dialpositioner from "../components/dialposition.js";

const SunRotation = ({ isVisible = true, rotation }) => {
  const [sunRotation, setSunRotation] = useState(0);
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

    // Total seconds in 24 hours
    const totalSeconds = 24 * 3600;

    // Time passed since last 5:30 AM
    const secondsSinceStart = (now.getTime() - start.getTime()) / 1000;

    // Rotation since 5:30 AM
    const rotationSinceStart = (secondsSinceStart / totalSeconds) * 360;
    // Final rotation = saved rotation + time-based rotation
    const finalRotation = (initialRotation + rotationSinceStart) % 360;

    // if (refrence - finalRotation - 90 > 0) {
    //   setSunRotation(refrence - finalRotation - 90)
    // }
    // else {
    //   setSunRotation(finalRotation - refrence - 90)

    // }
      setSunRotation(refrence - finalRotation - 90)



  };
  useEffect(() => {
    applyTimeBasedRotation(parseFloat(rotation?.[0].Ravi), parseFloat(rotation?.[0].Nakshatra_mandal))
  }, [rotation])
  if (!isVisible) return null;

  return (
    <>
      <style>
        {`
      @keyframes revolveSun {
        from {
          transform: rotate(${sunRotation}deg) translateY(-240px);
        }
        to {
          transform: rotate(${sunRotation + 360}deg) translateY(-240px);
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
          animation: `revolveSun 86400s linear infinite`, // 24h rotation

        }}
      >

        <PlanetMarker
          rotationAngle={sunRotation}
          image={sunImage}
          label="Sun"
        />
      </div>
    </>
  );
};

export default SunRotation;
