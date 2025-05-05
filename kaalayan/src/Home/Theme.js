import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../Redux/themeSlice";

const Theme = () => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Theme: {theme}</h1>
        <button
          onClick={handleToggle}
          className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Toggle Theme
        </button>
      </div>
    </div>
  );
};

export default Theme;
