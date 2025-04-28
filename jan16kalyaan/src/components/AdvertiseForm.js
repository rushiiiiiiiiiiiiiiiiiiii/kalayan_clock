import React, { useState } from 'react';
import axios from 'axios';

const AdvertiseForm = () => {
  const [textInput, setTextInput] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');

  const handleFileChange = (e) => {
    setMediaFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('textInput', textInput);
    if (mediaFile) {
      formData.append('mediaFile', mediaFile);
    }

    try {
      const response = await axios.post('http://localhost:4000/advertise', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResponseMessage(response.data.message);
    } catch (error) {
      setResponseMessage(error.response ? error.response.data.message : 'Error uploading data');
    }
  };

  return (
    <div>
      <h2>Create Advertisement</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Text Input:</label>
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Upload Media File:</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*,video/*,audio/*"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default AdvertiseForm;
