import React, { useEffect, useState } from "react";
import PlanetMaker from "../components/PlanetMaker";
import saturnImage from "../assets/images/shani-01.png"; // Replace with correct Saturn image path
import dialpositioner from "./dialposition.js";

const SaturnRotation = ({isVisible=true}) => {
  const [saturnRotation, setSaturnRotation] = useState(0);
  const [apiConfig, setApiConfig] = useState(null);

  const config = {
    mode: "simulate", // simulate | real | test | custom | api
    customAngle: 55.5,
    datetime: new Date(),
    latitude: 28.6139,
    longitude: 77.2090,
    speed: 0.04,
    apiEndpoint: "" // Add if using real API
  };

  useEffect(() => {
    let interval;
    let animationId;

    if (config.mode === "simulate") {
      const startTimestamp = new Date(config.datetime).getTime();

      const updateRotation = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const totalMinutes = hours * 60 + minutes;
        const minutesSince6AM = totalMinutes - 6 * 60;

        let adjustedMinutes =
          minutesSince6AM < 0 ? minutesSince6AM + 24 * 60 : minutesSince6AM;

        const ghatika = Math.floor(adjustedMinutes / 24);
        let Ring_rotation, originX, originY;
        [Ring_rotation, originX, originY] = dialpositioner(Number(ghatika));
        const angle = Ring_rotation + 110;

        setSaturnRotation(angle);
        animationId = requestAnimationFrame(updateRotation);
      };

      updateRotation();
    }

    else if (config.mode === "real") {
      const startTimestamp = Date.now();
      const msInSaturnDay = 38360000; // Saturn day in milliseconds (~10h 39m)

      const updateRotation = () => {
        const now = Date.now();
        const elapsed = now - startTimestamp;
        const angle = (elapsed / msInSaturnDay) * 360;
        setSaturnRotation((prev) => (prev + angle) % 360);
        animationId = requestAnimationFrame(updateRotation);
      };

      updateRotation();
    }

    else if (config.mode === "test") {
      const startTimestamp = Date.now();
      const initialDatetime = new Date(config.datetime).getTime();
      const msInSaturnDay = 38360000;

      const updateRotation = () => {
        const now = Date.now();
        const elapsedSinceInput = now - initialDatetime;
        const timeAngle = (elapsedSinceInput / msInSaturnDay) * 360;
        const longitudeAngle = -config.longitude;
        const angle = ((timeAngle + longitudeAngle) * config.speed) % 360;

        setSaturnRotation((angle + 360) % 360);
        animationId = requestAnimationFrame(updateRotation);
      };

      updateRotation();
    }

    else if (config.mode === "custom") {
      setSaturnRotation(config.customAngle % 360);
    }

    else if (config.mode === "api" && config.apiEndpoint) {
      const fetchApiConfig = async () => {
        try {
          const res = await fetch(config.apiEndpoint);
          const data = await res.json();
          if (data.saturn) {
            setApiConfig(data.saturn);
          }
        } catch (err) {
          console.error("API fetch error:", err);
        }
      };

      fetchApiConfig();
      interval = setInterval(fetchApiConfig, 60000);
    }

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animationId);
    };
  }, []);

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
        setSaturnRotation((angle % 360 + 360) % 360);
        animationId = requestAnimationFrame(updateRotation);
      };

      updateRotation();
      return () => cancelAnimationFrame(animationId);
    }
  }, [apiConfig]);

  if(!isVisible) return null;
  return (
    <PlanetMaker
      rotationAngle={saturnRotation}
      image={saturnImage}
      label="Saturn"
    />
  );
};

export default SaturnRotation;
