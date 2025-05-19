import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleTheme } from "../Redux/themeSlice";
import { Sun, Moon } from "lucide-react"; // optional: use any icon library

export default function Modal({ open, close }) {
  const [language, setLanguage] = useState(localStorage.getItem("language") || "English");
  const [Location, setLocation] = useState();
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const setlocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          console.log(position.coords);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <>
      {open && (
        <div className="w-full md:w-[45%] lg:w-[30%] bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold mb-4">Theme & Preferences</h2>

          <ul className="w-full text-start">
            <li className="text-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded">
              <Link className="text-black dark:text-white no-underline" to={"/bg"}>
                Change Image
              </Link>
            </li>

            <li
              onClick={setlocation}
              className="text-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded cursor-pointer"
            >
              Set Location
            </li>

            <li className="text-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded">
              <label htmlFor="language" className="block mb-1">Choose Language:</label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-1 border rounded"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Marathi">Marathi</option>
              </select>
            </li>
          </ul>

          {/* Toggle Switch with Icon */}
          <li className="flex items-center justify-between mt-4 mb-4 px-2">
            <div className="flex items-center gap-2 font-semibold text-lg">
              {theme === "light" ? <Sun className="text-yellow-500" /> : <Moon className="text-blue-300" />}
              <span>{theme === "light" ? "Light Mode" : "Dark Mode"}</span>
            </div>
            <button
              onClick={handleToggle}
              className={`w-16 h-8 flex items-center rounded-full p-1 transition duration-300 ease-in-out ${
                theme === "light" ? "bg-yellow-400" : "bg-gray-600"
              }`}
            >
              <div
                className={`bg-white w-6 h-6 rounded-full shadow-md transform transition duration-300 ease-in-out ${
                  theme === "light" ? "translate-x-0" : "translate-x-8"
                }`}
              ></div>
            </button>
          </li>

          <button
            onClick={() => close(false)}
            className="w-full py-2 bg-red-600 text-white rounded-md"
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}
