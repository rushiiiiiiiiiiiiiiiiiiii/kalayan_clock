import React, { useEffect, useState } from "react";
import PlanetMaker from "../components/PlanetMaker";
import rahuImage from "../assets/images/rahu-09.png"; // Adjust path if needed

const RahuRotation = () => {
  const [rahuRotation, setRahuRotation] = useState(0);
  const [apiConfig, setApiConfig] = useState(null);

  const config = {
    mode: "simulate", // simulate | real | test | custom | api
    customAngle: 90,
    datetime: new Date("2023-01-01T00:00:00Z"),
    latitude: 28.6139,
    longitude: 77.2090,
    apiEndpoint: ""
  };

  useEffect(() => {
    let animationId;
    let interval;

    if (config.mode === "simulate") {
      const startTimestamp = Date.now();

      const updateRotation = () => {
        const now = Date.now();
        const elapsed = (now - startTimestamp) / 1000;
        const angle = (-elapsed * 0.6) % 360; // Simulated retrograde speed
        setRahuRotation((angle + 360) % 360);
        animationId = requestAnimationFrame(updateRotation);
      };

      updateRotation();
    }

    else if (config.mode === "real") {
      const startTimestamp = Date.now();
      const msInRahuOrbit = 585600000000; // Approx. 18.6 years for Rahu's orbital period

      const updateRotation = () => {
        const now = Date.now();
        const elapsed = now - startTimestamp;
        const angle = (elapsed / msInRahuOrbit) * 360;
        setRahuRotation((angle + 360) % 360);
        animationId = requestAnimationFrame(updateRotation);
      };

      updateRotation();
    }

    else if (config.mode === "test") {
      const testStartTime = new Date(config.datetime).getTime();
      const msInRahuOrbit = 585600000000; // Approx. 18.6 years for Rahu's orbital period

      const updateRotation = () => {
        const now = Date.now();
        const elapsed = now - testStartTime;
        const timeAngle = (elapsed / msInRahuOrbit) * 360;
        const adjusted = (timeAngle + config.latitude + config.longitude) % 360;
        setRahuRotation((adjusted + 360) % 360);
        animationId = requestAnimationFrame(updateRotation);
      };

      updateRotation();
    }

    else if (config.mode === "custom") {
      setRahuRotation(config.customAngle % 360);
    }

    else if (config.mode === "api" && config.apiEndpoint) {
      const fetchApiConfig = async () => {
        try {
          const res = await fetch(config.apiEndpoint);
          const data = await res.json();
          if (data.rahu) {
            setApiConfig(data.rahu);
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
  }, []); // Run on mount

  // API-driven rotation
  useEffect(() => {
    let animationId;

    if (config.mode === "api" && apiConfig) {
      const {
        initialAngle = 0,
        speed = 0.01,
        startTime,
        direction = "counterclockwise"
      } = apiConfig;

      const startTimestamp = new Date(startTime).getTime();
      const directionFactor = direction === "clockwise" ? 1 : -1;

      const updateRotation = () => {
        const now = Date.now();
        const elapsed = (now - startTimestamp) / 1000;
        const angle = initialAngle + directionFactor * elapsed * speed;
        setRahuRotation((angle % 360 + 360) % 360);
        animationId = requestAnimationFrame(updateRotation);
      };

      updateRotation();
      return () => cancelAnimationFrame(animationId);
    }
  }, [apiConfig]);

  return (
    <PlanetMaker
      rotationAngle={rahuRotation}
      image={rahuImage}
      label="Rahu"
    />
  );
};

export default RahuRotation;
