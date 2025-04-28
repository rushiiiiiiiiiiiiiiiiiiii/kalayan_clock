import React from 'react';
import globeVideo from '../../assets/clock.mp4'; // Update path if different

function Theme1() {
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden' }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
        }}
      >
        <source src={globeVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

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
        <p>This page uses your globe video as the background.</p>
      </div>
    </div>
  );
}

export default Theme1;
