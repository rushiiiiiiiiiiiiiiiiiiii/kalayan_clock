import React, { useEffect, useState } from "react";
import PlanetMarker from "../components/PlanetMaker.js";
import sunImage from "../assets/images/sun.png";

const SunRotation = ({ isVisible = true, rotation ,mandal}) => {
  const [sunRotation, setSunRotation] = useState(0);

  const applyTimeBasedRotation = (initialRotation, reference) => {
    const now = new Date();

    const start = new Date(now);
    start.setHours(5, 30, 0, 0);

    const totalSeconds = 24 * 3600;
    const secondsSinceStart = (now - start) / 1000;
    const rotationSinceStart = (secondsSinceStart / totalSeconds) * 360;
    console.log(rotationSinceStart,initialRotation)
    const finalRotation = (initialRotation+rotationSinceStart) % 360;

    setSunRotation(mandal-initialRotation-90 );

    console.log(mandal-initialRotation-90 )
  };

  useEffect(() => {
    if (rotation && rotation[0]?.Ravi && rotation[0]?.Nakshatra_mandal) {
      applyTimeBasedRotation(
        parseFloat(rotation[0].Ravi),
        parseFloat(rotation[0].Nakshatra_mandal)
      );
    }
  }, [rotation]);

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
              transform: rotate(${360 + sunRotation}deg) translateY(-240px);
            }
          }
        `}
      </style>

      <div
        style={{
          position: "absolute",
          top: "27%",
          left: "50%",
          transform: `translate(-50%, -50%) rotate(${sunRotation}deg) translateY(-240px)`,
          animation: `revolveSun 86400s linear infinite`, // Full 360° in 24 hours
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
