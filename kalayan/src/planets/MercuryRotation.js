import React, { useEffect, useState } from "react";
import PlanetMaker from "../components/PlanetMaker";
import mercuryImage from "../assets/images/budh-08.png"; // Adjust path if needed
import dialpositioner from "./dialposition.js";
const MercuryRotation = ({isVisible=true}) => {
  const [mercuryRotation, setMercuryRotation] = useState(8);
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
        const now = new Date();
                // Extract the hours, minutes, and seconds
                const hours = now.getHours();
                const minutes = now.getMinutes();
                      const elapsed = now - startTimestamp;
                        const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
                const currentTimeInMinutes = totalMinutes;
                const minutesSince6AM = currentTimeInMinutes - 6 * 60; // Calculate time passed since 6:00 AM
              
                let adjustedMinutes;
                if (minutesSince6AM < 0) {
                  // If the time is before 6:00 AM, consider it part of the previous day's Vedic time
                  adjustedMinutes = minutesSince6AM + 24 * 60; // Add 24 hours (1440 minutes)
                } else {
                  adjustedMinutes = minutesSince6AM;
                }
                //const  = adjustedMinutes / 24; // 1 ghatika = 24 minutes
                const ghatika = Math.floor(adjustedMinutes / 24); // 1 ghatika = 24 minutes
                      let Ring_rotation = 1200;
                      let originX;
                      let originY ;
                       let Rangle = Number(ghatika);
                      [Ring_rotation, originX, originY] = dialpositioner(Rangle);
                      //sconst angle = (elapsed * config.speed) / 1000- 93.5; // Adjust speed to match the desired rotation speed
                      const angle = Ring_rotation+84;
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

  if(!isVisible)return null;
  return (
    <PlanetMaker
      rotationAngle={mercuryRotation}
      image={mercuryImage}
      label="Mercury"
    />
  );
};

export default MercuryRotation;
