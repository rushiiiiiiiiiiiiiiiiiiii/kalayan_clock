import React, { useEffect, useState } from "react";
import PlanetMarker from "../components/PlanetMaker";
import jupiterImage from "../assets/images/Jupiter.png";
import dialpositioner from "./dialposition.js";
const JupiterRotation = ({ isVisible = true,rotation }) => {
  const [jupiterRotation, setJupiterRotation] = useState(0);
  const [apiConfig, setApiConfig] = useState(null);

  const applyTimeBasedRotation = (initialRotation) => {
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
  setJupiterRotation(finalRotation)
  console.log(finalRotation)

};
useEffect(()=>{
  applyTimeBasedRotation(parseFloat(rotation?.[0].Guru))
  

},[rotation])
   
   if (!isVisible) return null;
  return (
    <>
    <style>
        {`
      @keyframes revolveJupiter {
        from {
          transform: rotate(${jupiterRotation}deg) translateY(-240px);
        }
        to {
          transform: rotate(${jupiterRotation+360}deg) translateY(-240px);
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
          animation: `revolveJupiter  86400s linear infinite`, // 24h rotation

        }}
        >
    <PlanetMarker
      rotationAngle={jupiterRotation}
      image={jupiterImage}
      label="Jupiter"
      />
      
      </div>
    </>
  );
};

export default JupiterRotation;
