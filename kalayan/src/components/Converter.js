import React, { useState, useEffect } from "react";

const VedicTimeConverter = () => {
  const [vedicTime, setVedicTime] = useState("");
  const [indianTime, setIndianTime] = useState("");
  
  // State for manual input
  const [inputTime, setInputTime] = useState({ hours: "", minutes: "", seconds: "" });

  // Function to get and format the current Indian time
  const getIndianTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    // Update Indian time every second
    const interval = setInterval(() => {
      setIndianTime(getIndianTime());
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  // Function to convert the manually input time to Vedic time
  const convertToVedicTime = () => {
    const { hours, minutes, seconds } = inputTime;

    // Validate the input
    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds) || 
        hours < 0 || hours > 23 || minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) {
      alert("Please enter valid time in HH:MM:SS format.");
      return;
    }

    const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
    const currentTimeInMinutes = totalMinutes + (seconds / 60);
    const minutesSince6AM = currentTimeInMinutes - 6 * 60; // Calculate time passed since 6:00 AM

    let adjustedMinutes;
    if (minutesSince6AM < 0) {
      // If the time is before 6:00 AM, consider it part of the previous day's Vedic time
      adjustedMinutes = minutesSince6AM + 24 * 60; // Add 24 hours (1440 minutes)
    } else {
      adjustedMinutes = minutesSince6AM;
    }

    // Convert to Vedic time
    const ghatikas = adjustedMinutes / 24; // 1 ghatika = 24 minutes
    const ghatikaPart = Math.floor(ghatikas); // Whole ghatikas
    const pal = (ghatikas - ghatikaPart) * 60; // Remaining part in pal (60 pal = 1 ghatika)
    const palPart = Math.floor(pal);
    const vipal = (pal - palPart) * 60; // Remaining part in vipal (60 vipal = 1 pal)
    const vipalPart = Math.floor(vipal);

    // Format and set the Vedic time
    setVedicTime(`${ghatikaPart} Ghatikas : ${palPart} Pals : ${vipalPart} Vipals`);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputTime((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Vedic Time Converter</h2>

      {/* Manual input fields for HH:MM:SS */}
      <div style={{ margin: "20px" }}>
        <input 
          type="number" 
          name="hours" 
          placeholder="HH" 
          value={inputTime.hours} 
          onChange={handleInputChange} 
          min="0" 
          max="23" 
          style={{ width: "50px", margin: "0 5px" }} 
        />
        <input 
          type="number" 
          name="minutes" 
          placeholder="MM" 
          value={inputTime.minutes} 
          onChange={handleInputChange} 
          min="0" 
          max="59" 
          style={{ width: "50px", margin: "0 5px" }} 
        />
        <input 
          type="number" 
          name="seconds" 
          placeholder="SS" 
          value={inputTime.seconds} 
          onChange={handleInputChange} 
          min="0" 
          max="59" 
          style={{ width: "50px", margin: "0 5px" }} 
        />
      </div>

      {/* Flexbox for Indian and Vedic Time display */}
      <div style={{ display: "flex", justifyContent: "space-between", margin: "20px" }}>
        {/* Indian Time (continuously updating) */}
        <div>
          <h3>Indian Time</h3>
          <p>{indianTime}</p>
        </div>

        {/* Vedic Time (shown after button click) */}
        <div>
          <h3>Vedic Time</h3>
          <p>{vedicTime || "Click the button to convert!"}</p>
        </div>
      </div>

      {/* Button to trigger Vedic Time conversion */}
      <button onClick={convertToVedicTime}>Convert to Vedic Time</button>
    </div>
  );
};

export default VedicTimeConverter;
