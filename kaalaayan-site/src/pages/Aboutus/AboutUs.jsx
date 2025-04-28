import React from 'react';
import './AboutUs.css'; // Optional for further styling

function AboutUs() {
  return (
    <div
      className="about-us-page"
      style={{
        padding: '6rem 2rem',
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#0f172a' }}>
        About Us
      </h1>
      <p style={{ fontSize: '1.2rem', maxWidth: '800px', color: '#0f172a' }}>
        Kaalaayan is a humble approach to attain an enhanced human lifestyle by blending advanced
        scientific technologies with the profound knowledge systems of ancient India.
      </p>

      <div
        style={{
          marginTop: '3rem',
          padding: '2rem',
          border: '2px dashed orange',
          borderRadius: '10px',
          backgroundColor: '#fff3e0',
          color: '#e65100',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          maxWidth: '500px',
        }}
      >
        🚧 This page is a work in progress. Stay tuned for more updates! 🚧
      </div>
    </div>
  );
}

export default AboutUs;
