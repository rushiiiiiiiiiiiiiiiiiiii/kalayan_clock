import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Clock from './components/Clock1';
import Home from './Home/Home';
import ImageGallery from './Backgrounds/images';
import WheelComponent from './components/Wheel';
import Login from './components/Login';

import './App.css';
import Theme from './Home/Theme';

function App() {
  const isLoggedIn = sessionStorage.getItem("userid"); // or your custom session key

  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<Login />} />

      {/* Protected routes */}
      <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
      <Route path="/Bg" element={isLoggedIn ? <ImageGallery /> : <Navigate to="/login" />} />
      <Route path="/whell" element={isLoggedIn ? <WheelComponent /> : <Navigate to="/login" />} />

      {/* Optional: Catch all unknown paths */}
      <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
      <Route path='/theme' element={<Theme/>}/>
    </Routes>
  );
}

export default App;
