// components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <>
      {/* Invisible trigger zone at top */}
      <div
        onMouseEnter={() => setShowNav(true)}
        className="fixed  top-0 left-0 w-full h-[30px] z-40"
      ></div>

      {/* Actual navbar */}
      <div
        onMouseLeave={() => setShowNav(false)}
        className={`fixed  top-0 left-0 w-full z-50 bg-blue-800 text-white shadow transition-all duration-300 ${
          showNav ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex justify-center space-x-6 py-3 text-sm font-medium">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/new">NoAdClock</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavBar;
