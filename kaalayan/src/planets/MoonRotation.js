import React, { useEffect, useState } from "react";
import PlanetMarker from "../components/PlanetMaker";
import moonImage from "../assets/images/moon.webp"; // Adjust path if needed

const MoonRotation = () => {
  const [moonRotation, setMoonRotation] = useState(0);
  const [apiConfig, setApiConfig] = useState(null);

  // Internal configuration
  const config = {
    mode: "simulate", // <---- SET MODE HERE: simulate, real, test, custom, api
    customAngle: 0,  // The angle you want to set for the Moon's initial position
    apiEndpoint: "",
    datetime: new Date(), // The starting point for the rotation
    longitude: -23.5505,
    latitude: -46.6333,
    speed: 0.0365 // Adjust speed to simulate Moon's synchronous rotation (~27.3 days per orbit)
  };

  useEffect(() => {
    let interval;
    let animationId;

    // Simulate rotation mode - continuous rotation without resetting after a full circle
    if (config.mode === "simulate") {
      const startTimestamp = new Date(config.datetime).getTime(); // Get the starting point timestamp
      
      const updateRotation = () => {
        const now = Date.now();
        const elapsed = now - startTimestamp;
        const angle = (elapsed * config.speed) / 1000; // Adjust speed to match the desired rotation speed
        
        // Keep increasing the rotation angle beyond 360° (no modulo here)
        setMoonRotation(angle); // No % 360, allowing it to continue beyond 360°
        animationId = requestAnimationFrame(updateRotation);
      };

      updateRotation();
    }

    // Real-time rotation mode (based on UTC time)
    else if (config.mode === "real") {
      const startTimestamp = Date.now();
      const msInDay = 86400000; // 24 hours in milliseconds

      const updateRotation = () => {
        const now = Date.now();
        const elapsed = now - startTimestamp;
        const angle = (elapsed / msInDay) * 360; // A full rotation in one Earth day
        setMoonRotation((prev) => (prev + angle) % 360);
        animationId = requestAnimationFrame(updateRotation);
      };

      updateRotation();
    }

    // Test Mode with DateTime, Longitude, and Speed
    else if (config.mode === "test") {
      const startTimestamp = Date.now();
      const initialDatetime = new Date(config.datetime).getTime();
      const msInDay = 86400000;

      const updateRotation = () => {
        const now = Date.now();
        const elapsedSinceInput = now - initialDatetime;
        const timeAngle = (elapsedSinceInput / msInDay) * 360;
        const longitudeAngle = -config.longitude;
        const angle = ((timeAngle + longitudeAngle) * config.speed) % 360;

        setMoonRotation((angle + 360) % 360); // Normalize between 0-360
        animationId = requestAnimationFrame(updateRotation);
      };

      updateRotation();
    }

    // Custom static angle
    else if (config.mode === "custom") {
      setMoonRotation(config.customAngle % 360);
    }

    // API-driven config mode
    else if (config.mode === "api" && config.apiEndpoint) {
      const fetchApiConfig = async () => {
        try {
          const res = await fetch(config.apiEndpoint);
          const data = await res.json();
          if (data.moon) {
            setApiConfig(data.moon);
          }
        } catch (err) {
          console.error("API fetch error:", err);
        }
      };

      fetchApiConfig();
      interval = setInterval(fetchApiConfig, 60000); // Poll every 60s
    }

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animationId);
    };
  }, []); // Empty dependency array ensures it runs only once at mount

  // Continuous API-driven rotation
  useEffect(() => {
    let animationId;

    if (config.mode === "api" && apiConfig) {
      const {
        initialAngle = 0,
        speed = 0.2,
        startTime,
        direction = "clockwise"
      } = apiConfig;

      const startTimestamp = new Date(startTime).getTime();
      const directionFactor = direction === "counterclockwise" ? -1 : 1;

      const updateRotation = () => {
        const now = Date.now();
        const elapsed = (now - startTimestamp) / 1000; // seconds
        const angle = initialAngle + directionFactor * elapsed * speed;
        setMoonRotation((angle % 360 + 360) % 360);
        animationId = requestAnimationFrame(updateRotation);
      };

      updateRotation();
      return () => cancelAnimationFrame(animationId);
    }
  }, [apiConfig]);

  return (
    <PlanetMarker
      rotationAngle={moonRotation}
      image={moonImage}
      label="Moon"
    />
  );
};

export default MoonRotation;
