import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleTheme } from "../Redux/themeSlice";
import { FaSun, FaMoon } from "react-icons/fa";

export default function SettingsPanel() {
  const apiKey = process.env.REACT_APP_API_KEY;

  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "English"
  );
  const [location, setLocation] = useState(null);
  const [selectedCity, setSelectedCity] = useState('');

  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const cities = [
    { name: "New Delhi", longitude: 77.1025 },
    { name: "Mumbai", longitude: 72.8777 },
    { name: "Bangalore", longitude: 77.5946 },
    { name: "Chennai", longitude: 80.2785 },
    { name: "Kolkata", longitude: 88.3639 },
    { name: "Hyderabad", longitude: 78.4744 },
    { name: "Pune", longitude: 73.8567 },
    { name: "Ahmedabad", longitude: 72.5714 },
    { name: "Jaipur", longitude: 75.7873 },
    { name: "Surat", longitude: 72.8311 },
  ];
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const fetchLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };
  const handleChange = (e) => {
    const cityName = e.target.value;
    localStorage.setItem("city", cityName)
    setSelectedCity(cityName);
    getLong()
  }
  const handlelang = async (e) => {
    setLanguage(e.target.value)
    try {
      const reponse = await fetch(apiKey + `get_all_data/${e.target.value}`, {
        method: "GET"
      })
    } catch (error) {
      console.log(error)

    }
  }
  const handleToggle = () => {
    dispatch(toggleTheme());
  };
  const getLong = () => {
    const long = cities.find((name) => name.name == localStorage.getItem("city"))
    let time = 0
    if (long.longitude > 82.5) {
      time = (82.5 - long.longitude) * 4;  // Time behind IST
    } else if (long.longitude < 82.5) {
      time = (82.5 - long.longitude) * 4;  // Time ahead of IST
    } else {
      time = 0;  // Exact IST time
    }

    localStorage.setItem("localtime", parseInt(time))
  }
  useEffect(() => {
    getLong()
  }, [])
  return (
    <div className=" dark:bg-gray-800 p-6 rounded-2xl  w-full max-w-md mx-auto transition-all duration-300">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Theme Setting
      </h2>

      <div className="space-y-6">
        {/* Background Image Setting */}
        <div className="flex justify-between items-center">


          <Link
            to="/bg"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Change Dial Image
          </Link>
        </div>

        {/* Location Setting */}
        <div>
          <button
            onClick={fetchLocation}
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Get Current Location
          </button>
          {location && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Latitude: {location.latitude}, Longitude: {location.longitude}
            </p>
          )}
        </div>

        {/* Language Selector */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">
            Language
          </label>
          <select
            value={language}
            onChange={handlelang}
            className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-3 py-2"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Marathi">Marathi</option>
          </select>
        </div>
        <div>
          <h2>Select a City in India</h2>
          <select onChange={handleChange} value={selectedCity ? selectedCity : localStorage.getItem("city")} className="p-2 border rounded-md">
            <option value="">-- Select a city --</option>
            {cities.map((city, index) => (
              <option key={index} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        {/* Theme Toggle */}
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-200">
            {theme === "light" ? (
              <>
                <FaMoon className="text-blue-400" /> Dark Mode
              </>
            ) : (
              <>
                <FaSun className="text-yellow-400" /> Light Mode
              </>
            )}
          </span>
          <button
            onClick={handleToggle}
            className={`w-16 h-8 flex items-center rounded-full p-1 transition duration-300 ease-in-out ${theme === "light" ? " bg-gray-600" : " bg-yellow-400"
              }`}
          >
            <div
              className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ${theme === "light" ? "translate-x-0" : "translate-x-8"
                }`}
            ></div>
          </button>
        </div>
      </div>
    </div>
  );
}
