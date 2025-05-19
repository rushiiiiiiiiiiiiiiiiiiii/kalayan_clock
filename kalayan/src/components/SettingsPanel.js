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
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

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
const handlelang=async(e)=>{
  setLanguage(e.target.value)
  try {
    const reponse=await fetch(apiKey+`get_all_data/${e.target.value}`,{
      method:"GET"
    })
  } catch (error) {
    console.log(error)
    
  }
}
  const handleToggle = () => {
    dispatch(toggleTheme());
  };

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
            className={`w-16 h-8 flex items-center rounded-full p-1 transition duration-300 ease-in-out ${
              theme === "light" ? " bg-gray-600" : " bg-yellow-400"
            }`}
          >
            <div
              className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ${
                theme === "light" ? "translate-x-0" : "translate-x-8"
              }`}
            ></div>
          </button>
        </div>
      </div>
    </div>
  );
}
