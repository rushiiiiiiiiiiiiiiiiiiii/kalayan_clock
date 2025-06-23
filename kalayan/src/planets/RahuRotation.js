import React, { useEffect, useState } from "react";
import PlanetMaker from "../components/PlanetMaker";
import rahuImage from "../assets/images/rahu-09.png"; // Adjust path if needed
import dialpositioner from "./dialposition.js";
const RahuRotation = ({ isVisible = true }) => {
  const [rahuRotation, setRahuRotation] = useState(7);
  const [apiConfig, setApiConfig] = useState(null);

  const config = {
    mode: "simulate", // simulate | real | test | custom | api
    customAngle: 90,
    datetime: new Date("2023-01-01T00:00:00Z"),
    latitude: 28.6139,
    longitude: 77.2090,
    apiEndpoint: ""
  };

  // useEffect(() => {
  //   let animationId;
  //   let interval;

  //   if (config.mode === "simulate") {
  //     const startTimestamp = Date.now();

  //     const updateRotation = () => {
  //        const now = new Date();
  //                      // Extract the hours, minutes, and seconds
  //                      const hours = now.getHours();
  //                      const minutes = now.getMinutes();
  //                            const elapsed = now - startTimestamp;
  //                              const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
  //                      const currentTimeInMinutes = totalMinutes;
  //                      const minutesSince6AM = currentTimeInMinutes - 6 * 60; // Calculate time passed since 6:00 AM

  //                      let adjustedMinutes;
  //                      if (minutesSince6AM < 0) {
  //                        // If the time is before 6:00 AM, consider it part of the previous day's Vedic time
  //                        adjustedMinutes = minutesSince6AM + 24 * 60; // Add 24 hours (1440 minutes)
  //                      } else {
  //                        adjustedMinutes = minutesSince6AM;
  //                      }
  //                      //const  = adjustedMinutes / 24; // 1 ghatika = 24 minutes
  //                      const ghatika = Math.floor(adjustedMinutes / 24); // 1 ghatika = 24 minutes
  //                            let Ring_rotation = 1200;
  //                            let originX;
  //                            let originY ;
  //                             let Rangle = Number(ghatika);
  //                            [Ring_rotation, originX, originY] = dialpositioner(Rangle);
  //                            //sconst angle = (elapsed * config.speed) / 1000- 93.5; // Adjust speed to match the desired rotation speed
  //                            const angle = Ring_rotation-245;
  //       setRahuRotation((angle ));
  //       animationId = requestAnimationFrame(updateRotation);
  //     };

  //     updateRotation();
  //   }

  //   else if (config.mode === "real") {
  //     const startTimestamp = Date.now();
  //     const msInRahuOrbit = 585600000000; // Approx. 18.6 years for Rahu's orbital period

  //     const updateRotation = () => {
  //       const now = Date.now();
  //       const elapsed = now - startTimestamp;
  //       const angle = (elapsed / msInRahuOrbit) * 360;
  //       setRahuRotation((angle + 360) % 360);
  //       animationId = requestAnimationFrame(updateRotation);
  //     };

  //     updateRotation();
  //   }

  //   else if (config.mode === "test") {
  //     const testStartTime = new Date(config.datetime).getTime();
  //     const msInRahuOrbit = 585600000000; // Approx. 18.6 years for Rahu's orbital period

  //     const updateRotation = () => {
  //       const now = Date.now();
  //       const elapsed = now - testStartTime;
  //       const timeAngle = (elapsed / msInRahuOrbit) * 360;
  //       const adjusted = (timeAngle + config.latitude + config.longitude) % 360;
  //       setRahuRotation((adjusted + 360) % 360);
  //       animationId = requestAnimationFrame(updateRotation);
  //     };

  //     updateRotation();
  //   }

  //   else if (config.mode === "custom") {
  //     setRahuRotation(config.customAngle % 360);
  //   }

  //   else if (config.mode === "api" && config.apiEndpoint) {
  //     const fetchApiConfig = async () => {
  //       try {
  //         const res = await fetch(config.apiEndpoint);
  //         const data = await res.json();
  //         if (data.rahu) {
  //           setApiConfig(data.rahu);
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
  // }, []); // Run on mount

  // // API-driven rotation
  // useEffect(() => {
  //   let animationId;

  //   if (config.mode === "api" && apiConfig) {
  //     const {
  //       initialAngle = 0,
  //       speed = 0.01,
  //       startTime,
  //       direction = "counterclockwise"
  //     } = apiConfig;

  //     const startTimestamp = new Date(startTime).getTime();
  //     const directionFactor = direction === "clockwise" ? 1 : -1;

  //     const updateRotation = () => {
  //       const now = Date.now();
  //       const elapsed = (now - startTimestamp) / 1000;
  //       const angle = initialAngle + directionFactor * elapsed * speed;
  //       setRahuRotation((angle % 360 + 360) % 360);
  //       animationId = requestAnimationFrame(updateRotation);
  //     };

  //     updateRotation();
  //     return () => cancelAnimationFrame(animationId);
  //   }
  // }, [apiConfig]);

  if (!isVisible) return null;
  return (
    // <PlanetMaker
    //   rotationAngle={rahuRotation}
    //   image={rahuImage}
    //   label="Rahu"
    // />
    // <div
    //   className="absolute top-[30%] left-[48%] w-10 h-10"
    //   style={{
    //     transform: `rotate(${0}deg)`,
    //   }}
    // >
    //   <div
    //     className="animate origin-center"
    //     style={{
    //       animation: `orbit 5s linear infinite`,
    //     }}
    //   >
    //     <div >
    //     </div>
    //   </div>
    // </div>
          <PlanetMaker
            rotationAngle={rahuRotation}
            image={rahuImage}
            label="Rahu"
          />
  );
};

export default RahuRotation;
