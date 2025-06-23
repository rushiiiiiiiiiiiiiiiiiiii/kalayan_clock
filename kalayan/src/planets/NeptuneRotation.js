import React, { useEffect, useState } from "react";
import PlanetMaker from "../components/PlanetMaker";
import neptuneImage from "../assets/images/neptune-04.png"; // Adjust path if needed

const NeptuneRotation = ({isVisible=true}) => {
  const [neptuneRotation, setNeptuneRotation] = useState(3);
  const [apiConfig, setApiConfig] = useState(null);

  const config = {
    mode: "simulate", // simulate | real | test | custom | api
    customAngle: 90,
    datetime: new Date(),
    latitude: 0, // Neptune's equator (optional for simulation)
    longitude: 0, // Default for simulation
    speed: 4, // Degrees per second for simulate/test (adjust for Neptune)
    apiEndpoint: "" // Fill with a real endpoint if using API mode
  };

  useEffect(() => {
    let interval;
    let animationId;

    if (config.mode === "simulate") {
      const startTimestamp = new Date(config.datetime).getTime();

      const updateRotation = () => {
        const now = Date.now();
        const elapsed = now - startTimestamp;
        const angle = (elapsed * config.speed) / 1000; // degrees per second
        setNeptuneRotation(angle);
        animationId = requestAnimationFrame(updateRotation);
      };

      updateRotation();
    }

    else if (config.mode === "real") {
      const startTimestamp = Date.now();
      const msInNeptuneDay = 16 * 60 * 60 * 1000; // Neptune sidereal day in milliseconds (16 hours)

      const updateRotation = () => {
        const now = Date.now();
        const elapsed = now - startTimestamp;
        const angle = (elapsed / msInNeptuneDay) * 360; // Degrees per full rotation
        setNeptuneRotation((prev) => (prev + angle) % 360);
        animationId = requestAnimationFrame(updateRotation);
      };

      updateRotation();
    }

    else if (config.mode === "test") {
      const startTimestamp = Date.now();
      const initialDatetime = new Date(config.datetime).getTime();
      const msInNeptuneDay = 16 * 60 * 60 * 1000;

      const updateRotation = () => {
        const now = Date.now();
        const elapsedSinceInput = now - initialDatetime;
        const timeAngle = (elapsedSinceInput / msInNeptuneDay) * 360;
        const longitudeAngle = -config.longitude; // Adjust for longitude if required
        const angle = ((timeAngle + longitudeAngle) * config.speed) % 360;

        setNeptuneRotation((angle + 360) % 360);
        animationId = requestAnimationFrame(updateRotation);
      };

      updateRotation();
    }

    else if (config.mode === "custom") {
      setNeptuneRotation(config.customAngle % 360);
    }

    else if (config.mode === "api" && config.apiEndpoint) {
      const fetchApiConfig = async () => {
        try {
          const res = await fetch(config.apiEndpoint);
          const data = await res.json();
          if (data.neptune) {
            setApiConfig(data.neptune);
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
  }, []); // Runs once on mount

  // Handle API-driven animation
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
        const elapsed = (now - startTimestamp) / 1000;
        const angle = initialAngle + directionFactor * elapsed * speed;
        setNeptuneRotation((angle % 360 + 360) % 360);
        animationId = requestAnimationFrame(updateRotation);
      };

      updateRotation();
      return () => cancelAnimationFrame(animationId);
    }
  }, [apiConfig]);

  if(!isVisible)return null;
  return (
    <PlanetMaker
      rotationAngle={neptuneRotation}
      image={neptuneImage}
      label="Neptune"
    />
  );
};

export default NeptuneRotation;
