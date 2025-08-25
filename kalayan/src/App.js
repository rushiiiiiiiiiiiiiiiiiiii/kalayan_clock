import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './Home/Home';
import ImageGallery from './Backgrounds/images';
// import WheelComponent from './components/Wheel';
import Login from './components/Login';
import Theme from './Home/Theme';
import NoAdClock from './components/NoAdClock';
import SettingsPage from './components/SettingPage';
import NavBar from './components/Navbar'; // Hover navbar
import UserSchedule from './components/UserSchedule'
import UserPlayback from './components/UserPlayback';

import './App.css';
import Clock from './components/Clock';

function App() {
  const isLoggedIn = localStorage.getItem("userid"); // Boolean cast for safety

  return (
    <>
      {/* Show NavBar only when logged in */}
      {isLoggedIn && <NavBar />}

      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="/Clock" element={isLoggedIn ? <Clock /> : <Navigate to="/login" />} />
        <Route path="/Bg" element={isLoggedIn ? <ImageGallery /> : <Navigate to="/login" />} />
        {/* <Route path="/whell" element={isLoggedIn ? <WheelComponent /> : <Navigate to="/login" />} /> */}
        <Route path="/settings" element={isLoggedIn ? <SettingsPage /> : <Navigate to="/login" />} />
        <Route path="/theme" element={isLoggedIn ? <Theme /> : <Navigate to="/login" />} />
        <Route path="/new" element={isLoggedIn ? <NoAdClock /> : <Navigate to="/login" />} />
        <Route path="/schedule" element={isLoggedIn ? <UserSchedule /> : <Navigate to="/login" />} />
        <Route path="/play" element={isLoggedIn ? <UserPlayback /> : <Navigate to="/login" />} />

        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
      </Routes>
    </>
  );
}

export default App;
