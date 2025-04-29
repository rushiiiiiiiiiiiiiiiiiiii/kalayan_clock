// import React, { useEffect, useState } from "react";

// const Location = () => {
//   const [location, setLocation] = useState({ lat: null, lon: null });
//   const [error, setError] = useState("");
// // fbec5f14009e46df8f851d440c4c9e83
//   useEffect(() => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setLocation({
//             lat: position.coords.latitude,
//             lon: position.coords.longitude,
//           })
//         },
//         (err) => {
//           setError("Permission denied or location unavailable.");
//           console.error("Error fetching location:", err);
//         }
//       );
//     } else {
//       setError("Geolocation is not supported by this browser.");
//     }
//     console.log(location)
//   }, []);

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-2">User Location:</h2>
//       {error ? (
//         <p className="text-red-500">{error}</p>
//       ) : location.lat && location.lon ? (
//         <p>
//           Latitude: {location.lat}, Longitude: {location.lon}
//         </p>
//       ) : (
//         <p>Fetching location...</p>
//       )}
//     </div>
//   );
// };

// export default Location;

import React, { useEffect, useState } from "react";

const LocationFetcher = () => {
  const [location, setLocation] = useState("Fetching location...");
  const [long,setlong]=useState()
  const apiKey = "fbec5f14009e46df8f851d440c4c9e83";

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          try {
            const res = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`
            );
            const data = await res.json();
            if (data && data.results && data.results.length > 0) {
              const formatted = data.results[0].formatted;
              setLocation(formatted);
            } else {
              setLocation("Unable to fetch location.");
            }
          } catch (err) {
            setLocation("Error fetching location.");
            console.error(err);
          }
        },
        error => {
          setLocation("Permission denied or error.");
          console.error(error);
        }
      );
    } else {
      setLocation("Geolocation is not supported.");
    }
  }, []);

  return (
    <div>
      <h2>Your Location:</h2>
      <p>{location}</p>
    </div>
  );
};

export default LocationFetcher;
