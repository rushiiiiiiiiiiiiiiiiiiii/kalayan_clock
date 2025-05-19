// export default UserPlayback;
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
function UserPlayback() {
  const [scheduledMedia, setScheduledMedia] = useState([]);
  const mediaRefs = useRef({});
  const timeouts = useRef({});

  useEffect(() => {
    axios
      .get('http://192.168.110:5100/user-schedule')
      .then((res) => setScheduledMedia(res.data))
      .catch((err) => console.error('Error fetching schedule:', err));
  }, []);

  useEffect(() => {
    // Clear previous timeouts
    Object.values(timeouts.current).forEach(clearTimeout);
    timeouts.current = {};

    scheduledMedia.forEach((media) => {
      const [year, month, day] = media.schedule_date.split('-');
      const [hour, minute] = media.schedule_time.split(':');
      const scheduledTime = new Date(year, month - 1, day, hour, minute);
      const now = new Date();
      const delay = scheduledTime.getTime() - now.getTime();

      if (delay <= 0) {
        const element = mediaRefs.current[media.id];
        if (element && element.paused) {
          element.play().catch(err => console.warn('Auto-play failed:', err));
        }
      } else {
        timeouts.current[media.id] = setTimeout(() => {
          const element = mediaRefs.current[media.id];
          if (element && element.paused) {
            element.play().catch(err => console.warn('Auto-play failed:', err));
          }
        }, delay);
      }
    });

    return () => {
      Object.values(timeouts.current).forEach(clearTimeout);
    };
  }, [scheduledMedia]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center text-primary">Scheduled Media Playback</h2>

      {scheduledMedia.length === 0 ? (
        <div className="alert alert-warning text-center">No media scheduled.</div>
      ) : (
        <div className="row">
          {scheduledMedia.map((media) => {
            const [year, month, day] = media.schedule_date.split('-');
            const [hour, minute] = media.schedule_time.split(':');
            const scheduledTime = new Date(year, month - 1, day, hour, minute);
            const now = new Date();
            const canPlay = scheduledTime <= now;

            return (
              <div key={media.id} className="col-md-6 mb-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title text-success">{media.title}</h5>
                    <div className="mb-3">
                      {media.media_type === 'audio' ? (
                        <audio
                          ref={(el) => (mediaRefs.current[media.id] = el)}
                          controls
                          className="w-100"
                          src={`http://192.168.110:5100/uploads/media/${media.filename}`}
                        />
                      ) : (
                        <video
                          ref={(el) => (mediaRefs.current[media.id] = el)}
                          width="100%"
                          height="auto"
                          controls
                        >
                          <source src={`http://192.168.110:5100/uploads/media/${media.filename}`} />
                        </video>
                      )}
                    </div>
                    {!canPlay && (
                      <p className="text-muted">
                        Will be available at:{' '}
                        <strong>
                          {scheduledTime.toLocaleString('en-US', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })}
                        </strong>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default UserPlayback;
