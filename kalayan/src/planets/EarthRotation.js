import React, { useEffect, useState } from "react";
import PlanetMaker from "../components/PlanetMaker";
import earthImage from "../assets/images/earth.webp"; // Adjust path if needed

const EarthRotation = () => {
  const [earthRotation, setEarthRotation] = useState(11);
  const [apiConfig, setApiConfig] = useState(null);

  // const config = {
  //   mode: "simulate", // simulate | real | test | custom | api
  //   customAngle: 120,
  //   datetime: new Date(),
  //   latitude: 37.7749,
  //   longitude: -122.4194,
  //   speed: 0.5,
  //   apiEndpoint: "" // Fill with a real endpoint if using API mode
  // };

  // useEffect(() => {
  //   let interval;
  //   let animationId;

  //   if (config.mode === "simulate") {
  //     const startTimestamp = new Date(config.datetime).getTime();

  //     const updateRotation = () => {
  //       const now = Date.now();
  //       const elapsed = now - startTimestamp;
  //       const angle = (elapsed * config.speed) / 1000; // degrees per second
  //       setEarthRotation(angle);
  //       animationId = requestAnimationFrame(updateRotation);
  //     };

  //     updateRotation();
  //   }

  //   else if (config.mode === "real") {
  //     const startTimestamp = Date.now();
  //     const msInDay = 86400000;

  //     const updateRotation = () => {
  //       const now = Date.now();
  //       const elapsed = now - startTimestamp;
  //       const angle = (elapsed / msInDay) * 360;
  //       setEarthRotation((prev) => (prev + angle) % 360);
  //       animationId = requestAnimationFrame(updateRotation);
  //     };

  //     updateRotation();
  //   }

  //   else if (config.mode === "test") {
  //     const startTimestamp = Date.now();
  //     const initialDatetime = new Date(config.datetime).getTime();
  //     const msInDay = 86400000;

  //     const updateRotation = () => {
  //       const now = Date.now();
  //       const elapsedSinceInput = now - initialDatetime;
  //       const timeAngle = (elapsedSinceInput / msInDay) * 360;
  //       const longitudeAngle = -config.longitude;
  //       const angle = ((timeAngle + longitudeAngle) * config.speed) % 360;

  //       setEarthRotation((angle + 360) % 360);
  //       animationId = requestAnimationFrame(updateRotation);
  //     };

  //     updateRotation();
  //   }

  //   else if (config.mode === "custom") {
  //     setEarthRotation(config.customAngle % 360);
  //   }

  //   else if (config.mode === "api" && config.apiEndpoint) {
  //     const fetchApiConfig = async () => {
  //       try {
  //         const res = await fetch(config.apiEndpoint);
  //         const data = await res.json();
  //         if (data.earth) {
  //           setApiConfig(data.earth);
  //         }
  //       } catch (err) {
  //         console.error("API fetch error:", err);
  //       }
  //     };

  //     fetchApiConfig();
  //     interval = setInterval(fetchApiConfig, 60000); // Poll every 60s
  //   }

  //   return () => {
  //     clearInterval(interval);
  //     cancelAnimationFrame(animationId);
  //   };
  // }, []); // Runs once on mount

  // // Handle API-driven animation
  // useEffect(() => {
  //   let animationId;

  //   if (config.mode === "api" && apiConfig) {
  //     const {
  //       initialAngle = 0,
  //       speed = 0.2,
  //       startTime,
  //       direction = "clockwise"
  //     } = apiConfig;

  //     const startTimestamp = new Date(startTime).getTime();
  //     const directionFactor = direction === "counterclockwise" ? -1 : 1;

  //     const updateRotation = () => {
  //       const now = Date.now();
  //       const elapsed = (now - startTimestamp) / 1000;
  //       const angle = initialAngle + directionFactor * elapsed * speed;
  //       setEarthRotation((angle % 360 + 360) % 360);
  //       animationId = requestAnimationFrame(updateRotation);
  //     };

  //     updateRotation();
  //     return () => cancelAnimationFrame(animationId);
  //   }
  // }, [apiConfig]);
  return (
     <>
    <style>
        {`
      @keyframes revolveEarth {
        from {
          transform: rotate(${40}deg) translateY(-240px);
        }
        to {
          transform: rotate(${40+360}deg) translateY(-240px);
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
          animation: `revolveEarth  86400s linear infinite`, // 24h rotation

        }}
        >
    <PlanetMaker
      rotationAngle={earthRotation}
      image={earthImage}
      label="Earth"
      />
      
      </div>
      </>
  );
      
};

export default EarthRotation;
