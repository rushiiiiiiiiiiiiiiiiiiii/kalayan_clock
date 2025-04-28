import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage/Homepage';
import AboutUs from './pages/Aboutus/AboutUs';
import Gallery from './pages/Gallery/Gallery';
import EnquiryForm from './pages/ContactUs/EnquiryForm';
import Theme1 from './pages/Themes/Theme1';
import Theme2 from './pages/Themes/Theme2';
import Theme3 from './pages/Themes/Theme3';
import Theme4 from './pages/Themes/Theme4';
import Theme5 from './pages/Themes/Theme5';
import Footer from './components/Footer'; // Updated import

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<EnquiryForm />} /> {/* Updated Route */}
        <Route path="/theme1" element={<Theme1 />} />
        <Route path="/theme2" element={<Theme2 />} />
        <Route path="/theme3" element={<Theme3 />} />
        <Route path="/theme4" element={<Theme4 />} />
        <Route path="/theme5" element={<Theme5 />} />
        
      </Routes>
      <Footer /> {/* Render Footer here */}
    </>
  );
}

export default App;
