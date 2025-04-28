import React, { useState } from 'react';
import axios from 'axios';

const NotificationForm = () => {
  const [info, setInfo] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/notify', { info });
      setResponseMessage(response.data.message);
    } catch (error) {
      setResponseMessage(error.response ? error.response.data.message : 'Error submitting notification');
    }
  };

  return (
    <div>
      <h2>Create Notification</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Notification Info:</label>
          <input 
            type="text" 
            value={info} 
            onChange={(e) => setInfo(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default NotificationForm;
