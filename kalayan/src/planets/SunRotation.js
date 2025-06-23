import React, { useEffect, useState } from "react";
import PlanetMarker from "../components/PlanetMaker";
import sunImage from "../assets/images/sun.png"; // Adjust path if needed
import dialpositioner from "./dialposition.js";

const SunRotation = ({ isVisible = true }) => {
  const [sunRotation, setSunRotation] = useState(10);
  const [apiConfig, setApiConfig] = useState(null);

  // 🪐 Internal configuration
  // const config = {
  //   mode: "simulate", // <---- SET MODE HERE: simulate, real, test, custom, api
  //   customAngle: 0,
  //   apiEndpoint: "",
  //   datetime: new Date(), // The starting point for the rotation
  //   longitude: -23.5505,
  //   latitude: -46.6333,
  //   speed: 0.04 // Adjust speed to simulate Sun's slower rotation (approx 25 days for one full rotation)
  // };

  // useEffect(() => {
  //   let interval;
  //   let animationId;

  //   // Simulate rotation mode - continuous rotation without resetting after a full circle
  //   if (config.mode === "simulate") {
  //     const startTimestamp = new Date(config.datetime).getTime(); // Get the starting point timestamp
      
  //     const updateRotation = () => {
  //       //const now = Date.now();
  //        const now = new Date();
  // // Extract the hours, minutes, and seconds
  // const hours = now.getHours();
  // const minutes = now.getMinutes();
  //       const elapsed = now - startTimestamp;
  //         const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
  // const currentTimeInMinutes = totalMinutes;
  // const minutesSince6AM = currentTimeInMinutes - 6 * 60; // Calculate time passed since 6:00 AM

  // let adjustedMinutes;
  // if (minutesSince6AM < 0) {
  //   // If the time is before 6:00 AM, consider it part of the previous day's Vedic time
  //   adjustedMinutes = minutesSince6AM + 24 * 60; // Add 24 hours (1440 minutes)
  // } else {
  //   adjustedMinutes = minutesSince6AM;
  // }
  // //const  = adjustedMinutes / 24; // 1 ghatika = 24 minutes
  // const ghatika = Math.floor(adjustedMinutes / 24); // 1 ghatika = 24 minutes
  //       let Ring_rotation = 1200;
  //       let originX;
  //       let originY ;
  //        let Rangle = Number(ghatika);
  //       [Ring_rotation, originX, originY] = dialpositioner(Rangle);
  //       //sconst angle = (elapsed * config.speed) / 1000- 93.5; // Adjust speed to match the desired rotation speed
  //       const angle = Ring_rotation+67;
  //       // Keep increasing the rotation angle beyond 360° (no modulo here)
  //       setSunRotation(angle); // No % 360, allowing it to continue beyond 360°
  //       animationId = requestAnimationFrame(updateRotation);
  //     };

  //     updateRotation();
  //   }

  //   // Real-time rotation mode (based on UTC time)
  //   else if (config.mode === "real") {
  //     const startTimestamp = Date.now();
  //     const msInDay = 86400000; // 24 hours in milliseconds

  //     const updateRotation = () => {
  //       const now = Date.now();
  //       const elapsed = now - startTimestamp;
  //       const angle = (elapsed / msInDay) * 360; // A full rotation in one Earth day
  //       setSunRotation((prev) => (prev + angle) % 360);
  //       animationId = requestAnimationFrame(updateRotation);
  //     };

  //     updateRotation();
  //   }

  //   // Test Mode with DateTime, Longitude, and Speed
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

  //       setSunRotation((angle + 360) % 360); // Normalize between 0-360
  //       animationId = requestAnimationFrame(updateRotation);
  //     };

  //     updateRotation();
  //   }

  //   // Custom static angle
  //   else if (config.mode === "custom") {
  //     setSunRotation(config.customAngle % 360);
  //   }

  //   // API-driven config mode
  //   else if (config.mode === "api" && config.apiEndpoint) {
  //     const fetchApiConfig = async () => {
  //       try {
  //         const res = await fetch(config.apiEndpoint);
  //         const data = await res.json();
  //         if (data.sun) {
  //           setApiConfig(data.sun);
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
  // }, []); // Empty dependency array ensures it runs only once at mount

  // // Continuous API-driven rotation
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
  //       const elapsed = (now - startTimestamp) / 1000; // seconds
  //       const angle = initialAngle + directionFactor * elapsed * speed;
  //       setSunRotation((angle % 360 + 360) % 360);
  //       animationId = requestAnimationFrame(updateRotation);
  //     };

  //     updateRotation();
  //     return () => cancelAnimationFrame(animationId);
  //   }
  // }, [apiConfig]);
  if (!isVisible) return null;

  return (
    <PlanetMarker
      rotationAngle={sunRotation}
      image={sunImage}
      label="Sun"
    />
  );
};

export default SunRotation;
