import React from 'react';
import backgroundImage from '../../assets/man.mp4'; // Replace with your actual image path

function Theme1() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        zIndex: 1,
      }}
    >
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          color: '#fff',
          textAlign: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }}
      >
        <h1>Welcome to Theme 1</h1>
        <p>This page uses an image as the background, just like the homepage.</p>

        <div

        >
                   
        </div>
      </div>
    </div>
  );
}

export default Theme1;
