import React, { useState } from 'react';

function EnquiryForm() {
  const [selectedTV, setSelectedTV] = useState('');
  const handleTVChange = (event) => {
    setSelectedTV(event.target.value);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column', // Stack form and map vertically
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
        paddingTop: '60px',
        paddingBottom: '50px', // Add space at the bottom of the page
      }}
    >
      {/* Form Container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '1200px',
          padding: '4rem',
          backgroundColor: '#fff',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          marginBottom: '3rem', // Space between form and map
        }}
      >
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Enquiry Form</h2>

          <input
            type="text"
            placeholder="Your Name"
            style={{
              marginBottom: '20px',
              padding: '20px',
              borderRadius: '5px',
              fontSize: '1.2rem',
            }}
          />

          <input
            type="text"
            placeholder="Phone Number"
            style={{
              marginBottom: '20px',
              padding: '20px',
              borderRadius: '5px',
              fontSize: '1.2rem',
            }}
          />

          <input
            type="email"
            placeholder="Your Email"
            style={{
              marginBottom: '20px',
              padding: '20px',
              borderRadius: '5px',
              fontSize: '1.2rem',
            }}
          />

          <textarea
            placeholder="Your Requirements"
            style={{
              marginBottom: '25px',
              padding: '20px',
              borderRadius: '5px',
              fontSize: '1.2rem',
              height: '150px',
            }}
          />

          <div style={{ marginBottom: '25px' }}>
            <label style={{ fontSize: '1.5rem', marginBottom: '5px' }}>Select TV Model:</label>
            <div>
              <label style={{ marginRight: '25px', fontSize: '1.2rem' }}>
                <input
                  type="radio"
                  name="tvModel"
                  value="32inch"
                  checked={selectedTV === '32inch'}
                  onChange={handleTVChange}
                />
                32-inch TV
              </label>
              <label style={{ fontSize: '1.2rem' }}>
                <input
                  type="radio"
                  name="tvModel"
                  value="20inch"
                  checked={selectedTV === '20inch'}
                  onChange={handleTVChange}
                />
                20-inch TV
              </label>
            </div>
          </div>

          <button
            type="submit"
            style={{
              padding: '20px',
              backgroundColor: '#0f172a',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1.2rem',
            }}
          >
            Send
          </button>
        </form>
      </div>

      {/* Google Map Embed Container */}
      <div
        style={{
          width: '100%',
          maxWidth: '1200px', // Make map container the same size as the form
          height: '500px', // Set height for map
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        <h3 style={{ textAlign: 'center', fontSize: '1.5rem' }}>Our Location</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d236.49133153358974!2d74.13162396502965!3d18.489940571114825!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2e152fa398783%3A0xc123768febf96f0!2sVaidik%20Tech!5e0!3m2!1sen!2sin!4v1744890671669!5m2!1sen!2sin"
          width="100%" // Ensures full width of the parent container
          height="100%" // Ensures full height of the parent container
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

export default EnquiryForm;
