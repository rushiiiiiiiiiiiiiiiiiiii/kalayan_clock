import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./Home/Home";
import ImageGallery from "./Backgrounds/images";
import Login from "./components/Login";
import Theme from "./Home/Theme";
import NoAdClock from "./components/NoAdClock";
import SettingsPage from "./components/SettingPage";
import NavBar from "./components/Navbar";
import UserSchedule from "./components/UserSchedule";
import UserPlayback from "./components/UserPlayback";
import Clock from "./components/Clock";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null = loading

  useEffect(() => {
    fetch(process.env.REACT_APP_API_KEY + "/tv-check-auth", {
      credentials: "include"   // ✅ SEND COOKIE
    })
      .then(res => res.json())
      .then(data => {
        setIsLoggedIn(data.auth);
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

  // ⏳ While checking auth
  if (isLoggedIn === null) {
    return <div>Checking login...</div>;
  }

  return (
    <>
      {/* ✅ NavBar only if logged in */}
      {isLoggedIn && <NavBar />}

      <Routes>
        {/* ✅ PUBLIC */}
        <Route
          path="/login"
          element={!isLoggedIn ? <Login /> : <Navigate to="/" />}
        />

        {/* ✅ PROTECTED */}
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/Clock"
          element={isLoggedIn ? <Clock /> : <Navigate to="/login" />}
        />
        <Route
          path="/Bg"
          element={isLoggedIn ? <ImageGallery /> : <Navigate to="/login" />}
        />
        <Route
          path="/settings"
          element={isLoggedIn ? <SettingsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/theme"
          element={isLoggedIn ? <Theme /> : <Navigate to="/login" />}
        />
        <Route
          path="/new"
          element={isLoggedIn ? <NoAdClock /> : <Navigate to="/login" />}
        />
        <Route
          path="/schedule"
          element={isLoggedIn ? <UserSchedule /> : <Navigate to="/login" />}
        />
        <Route
          path="/play"
          element={isLoggedIn ? <UserPlayback /> : <Navigate to="/login" />}
        />

        {/* ✅ FALLBACK */}
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/" : "/login"} />}
        />
      </Routes>
    </>
  );
}

export default App;
