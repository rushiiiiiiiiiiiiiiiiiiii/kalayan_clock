import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
function UserSchedule() {
  const [mediaList, setMediaList] = useState([]);
  const [mediaId, setMediaId] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(apiKey+'media-files')
      .then((res) => {setMediaList(res.data)
        console.log(res.data)
      })
      .catch((err) => console.error('Error fetching media:', err));
  }, []);

  const handleSchedule = async (e) => {
    e.preventDefault();
    try {
      await axios.post(apiKey+'schedule-media', {
        mediaId,
        scheduleDate,
        scheduleTime,
      });

      toast.success('Scheduled successfully');

      // Reset form
      setMediaId('');
      setScheduleDate('');
      setScheduleTime('');
      e.target.reset(); // Reset HTML form elements
    } catch (err) {
      alert('Failed to schedule');
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
        <ToastContainer position="top-center" autoClose={3000} />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-success text-white text-center">
              <h4>Schedule Media Playback</h4>
            </div>
            <div className="card-body bg-light">
              <form onSubmit={handleSchedule}>
                <div className="mb-3">
                  <label className="form-label text-success">Select Media</label>
                  <select
                    className="form-select"
                    onChange={(e) => setMediaId(e.target.value)}
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>
                      -- Choose media --
                    </option>
                    {mediaList.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label text-success">Schedule Date</label>
                  <input
                    type="date"
                    className="form-control"
                    onChange={(e) => setScheduleDate(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label text-success">Schedule Time</label>
                  <input
                    type="time"
                    className="form-control"
                    onChange={(e) => setScheduleTime(e.target.value)}
                    required
                  />
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-success w-100">
                    Schedule Media
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer text-muted text-center">
              Ensure time is in future for scheduled playback.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSchedule;
