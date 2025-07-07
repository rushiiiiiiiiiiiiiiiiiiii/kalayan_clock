// export default UserPlayback;
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
function UserPlayback() {
  const [scheduledMedia, setScheduledMedia] = useState([]);
  const [media, setmedia] = useState([])
  const [data , setdata] = useState([])
  const mediaRefs = useRef({});
  const timeouts = useRef({});
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(apiKey + 'user-schedule')
      .then((res) => {
        setScheduledMedia(res.data)
      })
      .catch((err) => console.error('Error fetching schedule:', err));
  }, []);

  useEffect(() => {
    axios
      .get(apiKey + 'media-files')
      .then((res) => {
        setmedia(res.data)
      })
      .catch((err) => console.error('Error fetching media:', err));
  }, [scheduledMedia]); 
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


  const findMedia = scheduledMedia.map((audio,i)=>{
    const combine = media.find(medias =>medias.id == audio.media_id);
    return combine
  })  
  useEffect(()=>{
    setdata(findMedia)
    console.log(findMedia)
  },[media])
  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center text-primary">Scheduled Media Playback</h2>

      {data.length === 0 ? (
        <div className="alert alert-warning text-center">No media scheduled.</div>
      ) : (
        <div className="row">
          {data.map((medias,i) => {
            const [year, month, day] = scheduledMedia?.[i]?.schedule_date;
            const [hour, minute] = scheduledMedia?.[i]?.schedule_time;
            const scheduledTime = new Date(year, month - 1, day, hour, minute);
            const now = new Date();
            const canPlay = scheduledTime <= now;
            console.log(medias.media_type)
            return (
              <div key={medias.id} className="col-md-6 mb-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    
                    <h5 className="card-title text-success">{medias.title}</h5>
                    <div className="mb-3">
                      {medias.media_type === 'audio' ? (
                        // <audio
                        //   ref={(el) => (mediaRefs.current[medias.id] = el)}
                        //   controls
                        //   className="w-100"
                        //   src={apiKey + `uploads/media/${medias.filename}`}
                        // />
                        <audio controls src={`${apiKey}uploads/media/atharvashirsha-1747312568823.mp3`}  ></audio>

                      ) : (
                        <video
                          ref={(el) => (mediaRefs.current[medias.id] = el)}
                          width="100%"
                          height="auto"
                          controls
                        >
                          <source src={apiKey + `uploads/media/${medias.filename}`} />
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
