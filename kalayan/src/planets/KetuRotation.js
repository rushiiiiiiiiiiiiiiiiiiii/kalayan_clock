import React, { useEffect, useState } from "react";
import PlanetMaker from "../components/PlanetMaker";
import ketuImage from "../assets/images/ketu-10.png";
import dialpositioner from "./dialposition.js";
import { Divide } from "lucide-react";
const KetuRotation = ({isVisible=true,rotation}) => {
  const [ketuRotation, setKetuRotation] = useState(0);
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
  setKetuRotation(finalRotation)
  console.log(finalRotation)
  
};
useEffect(()=>{
  applyTimeBasedRotation(parseFloat(rotation?.[0].Ketu))
},[rotation])
  if(!isVisible)return true
  return (
    <>
     <style>
        {`
      @keyframes revolveKetu {
        from {
          transform: rotate(${ketuRotation}deg) translateY(-240px);
        }
        to {
          transform: rotate(${ketuRotation+360}deg) translateY(-240px);
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
          animation: `revolveKetu  86400s linear infinite`, // 24h rotation

        }}
        >
    <PlanetMaker
      rotationAngle={ketuRotation}
      image={ketuImage}
      label="Ketu"
    />
    </div>
    </>
  );
};

export default KetuRotation;
