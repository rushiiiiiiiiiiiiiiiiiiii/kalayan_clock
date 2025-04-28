import React from 'react';
import './Gallery.css'; // Optional: Create this CSS file if needed

function Gallery() {
  const images = [
    '/assets/img1.jpg',
    '/assets/img2.jpg',
    '/assets/img3.jpg',
    '/assets/img4.jpg',
    // Add your image paths
  ];

  return (
    <div
      className="gallery-page"
      style={{
        padding: '6rem 2rem',
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        color: '#0f172a',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Gallery</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem', maxWidth: '600px', marginInline: 'auto' }}>
        A visual journey into the innovations of Kaalaayan — explore our timekeeping technologies and cultural heritage.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`gallery-${index}`}
            style={{ width: '100%', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
        ))}
      </div>

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
          marginInline: 'auto',
        }}
      >
        🚧 This gallery is still under construction. More images coming soon! 🚧
      </div>
    </div>
  );
}

export default Gallery;
