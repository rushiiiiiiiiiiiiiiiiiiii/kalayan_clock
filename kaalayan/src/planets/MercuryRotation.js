import React, { useEffect, useState } from "react";
import PlanetMaker from "../components/PlanetMaker";
import mercuryImage from "../assets/images/mercury.jpg"; // Adjust path if needed

const MercuryRotation = () => {
  const [mercuryRotation, setMercuryRotation] = useState(0);
  const [apiConfig, setApiConfig] = useState(null);

  const config = {
    mode: "simulate", // simulate | real | test | custom | api
    customAngle: 90,
    datetime: new Date(),
    latitude: 0, // Mercury's equator
    longitude: 0, // Default for simulation
    speed: 1, // Degrees per second for simulate/test (lower speed for Mercury)
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
        setMercuryRotation(angle);
        animationId = requestAnimationFrame(updateRotation);
      };

      updateRotation();
    }

    else if (config.mode === "real") {
      const startTimestamp = Date.now();
      const msInMercuryDay = 5040 * 60 * 60 * 1000; // Mercury sidereal day in milliseconds (~58.6 Earth days)

      const updateRotation = () => {
        const now = Date.now();
        const elapsed = now - startTimestamp;
        const angle = (elapsed / msInMercuryDay) * 360; // Degrees per full rotation
        setMercuryRotation((prev) => (prev + angle) % 360);
        animationId = requestAnimationFrame(updateRotation);
      };

      updateRotation();
    }

    else if (config.mode === "test") {
      const startTimestamp = Date.now();
      const initialDatetime = new Date(config.datetime).getTime();
      const msInMercuryDay = 5040 * 60 * 60 * 1000;

      const updateRotation = () => {
        const now = Date.now();
        const elapsedSinceInput = now - initialDatetime;
        const timeAngle = (elapsedSinceInput / msInMercuryDay) * 360;
        const longitudeAngle = -config.longitude; // Adjust for longitude if required
        const angle = ((timeAngle + longitudeAngle) * config.speed) % 360;

        setMercuryRotation((angle + 360) % 360);
        animationId = requestAnimationFrame(updateRotation);
      };

      updateRotation();
    }

    else if (config.mode === "custom") {
      setMercuryRotation(config.customAngle % 360);
    }

    else if (config.mode === "api" && config.apiEndpoint) {
      const fetchApiConfig = async () => {
        try {
          const res = await fetch(config.apiEndpoint);
          const data = await res.json();
          if (data.mercury) {
            setApiConfig(data.mercury);
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
        setMercuryRotation((angle % 360 + 360) % 360);
        animationId = requestAnimationFrame(updateRotation);
      };

      updateRotation();
      return () => cancelAnimationFrame(animationId);
    }
  }, [apiConfig]);

  return (
    <PlanetMaker
      rotationAngle={mercuryRotation}
      image={mercuryImage}
      label="Mercury"
    />
  );
};

export default MercuryRotation;
