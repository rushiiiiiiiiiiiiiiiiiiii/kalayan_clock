import React, { useEffect, useState } from "react";

const LocationFetcher = () => {
  const [location, setLocation] = useState("Fetching location...");
  // const [localTime, setLocalTime] = useState(null); // To store calculated time

console.log(location)
// console.log(localTime)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Calculate time based on longitude
        // let time = 0;
        // if (longitude > 82.5) {
        //   time = (82.5 - longitude) * 4;  // Time behind IST
        // } else if (longitude < 82.5) {
        //   time = (82.5 - longitude) * 4;  // Time ahead of IST
        // } else {
        //   time = 0;  // Exact IST time
        // }

        // setLocalTime(time);  // Update state with the calculated time
        // localStorage.setItem("localtime", parseInt(time))
        // You can also display the location on a map or use the coordinates for other purposes
        setLocation(`Latitude: ${latitude}, Longitude: ${longitude}`);
      }, function (error) {
        console.error('Error occurred while retrieving location:', error.message);
        setLocation("Error fetching location.");
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
      setLocation("Geolocation is not supported.");
    }
  }, []);

  return (
    <div>
      {/* <h2>Your Location:</h2>
      <p>{location}</p>
      <p>Local Time Difference from IST (in minutes): {localTime}</p> */}
    </div>
  );
};

export default LocationFetcher;
