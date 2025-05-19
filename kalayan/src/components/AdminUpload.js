import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
export default function AdminUpload() {
  const [title, setTitle] = useState('');
  const [mediaType, setMediaType] = useState('audio');
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('media', file);
    formData.append('title', title);
    formData.append('mediaType', mediaType);

    try {
      await axios.post('http://192.168.0.110:5100/upload-media', formData);
      toast.success('Media uploaded successfully');
      setTitle('');
      setFile(null);
      setMediaType('audio');
      e.target.reset();
    } catch (error) {
      toast.error('Upload failed');
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
              <ToastContainer position="top-center" autoClose={3000} />
      
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow border-0">
            <div className="card-header bg-primary text-white text-center">
              <h4>Upload Media File</h4>
            </div>
            <div className="card-body bg-light">
              <form onSubmit={handleUpload}>
                <div className="mb-3">
                  <label className="form-label text-primary">Media Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter media title"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-primary">Media Type</label>
                  <select
                    className="form-select"
                    value={mediaType}
                    onChange={(e) => setMediaType(e.target.value)}
                  >
                    <option value="audio">Audio</option>
                    <option value="video">Video</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label text-primary">Select Media File</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="audio/*,video/*"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                  />
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-success w-100">
                    Upload
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer text-center text-muted" style={{ fontSize: '0.9rem' }}>
              Supported formats: MP3, MP4, WAV, etc.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
