import { useState } from "react";
import { Link } from "react-router-dom";
import "./AdminNavbar.css";

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidenav = () => {
    const newState = !isOpen;
    setIsOpen(newState);

    // Add or remove a body class to control layout shift
    if (newState) {
      document.body.classList.add("sidenav-open");
    } else {
      document.body.classList.remove("sidenav-open");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("http://192.168.0.103:5101/api/admin/logout", {
        method: "POST",
        credentials: "include", // important for cookies
      });

      // Remove any client-side state if needed
      localStorage.clear();

      // Redirect to login page
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      {/* Hamburger Button */}
      <div className="hamburger" onClick={toggleSidenav}>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
      </div>

      {/* Sidebar */}
      <div className={`admin-sidenav ${isOpen ? "open" : ""}`}>
        <div className="sidenav-logo">कालायन</div>
        <ul className="sidenav-links">
          <li>
            <Link to="/Dashboard" onClick={toggleSidenav}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/AddNotification" onClick={toggleSidenav}>
              Add Notification
            </Link>
          </li>
          <li>
            <Link to="/AddBg" onClick={toggleSidenav}>
              Upload Background
            </Link>
          </li>
          <li>
            <Link to="/Addclock" onClick={toggleSidenav}>
              Add Clock
            </Link>
          </li>
          <li>
            <Link to="/SendNotification" onClick={toggleSidenav}>
              Send Notification
            </Link>
          </li>
          <li>
            <Link to="/SunTimings" onClick={toggleSidenav}>
              Sun Timings
            </Link>
          </li>
          <li>
            <Link to="/subscription" onClick={toggleSidenav}>
              Subscription
            </Link>
          </li>
          <li>
            <Link to="/upload" onClick={toggleSidenav}>
              Upload Excel
            </Link>
          </li>
          <li>
            <Link to="/Uploadplanet" onClick={toggleSidenav}>
              UploadPlanet
            </Link>
          </li>

          <li>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
        <div className="company-name">Pacecon</div>
      </div>

      {/* Background overlay when menu open */}
      {isOpen && (
        <div className="sidenav-overlay" onClick={toggleSidenav}></div>
      )}
    </>
  );
};

export default AdminNavbar;
