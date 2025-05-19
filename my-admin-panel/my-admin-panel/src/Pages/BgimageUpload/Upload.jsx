import { useState } from "react";
import { API_ENDPOINTS } from "../../config"; // Import API endpoints

export default function ImageUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false); // Track upload status

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    setIsUploading(true); // Start upload indicator

    try {
      const response = await fetch(API_ENDPOINTS.UPLOAD_IMAGE, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Server Response:", response, result);

      if (response.ok) {
        setMessage(result.message || "Upload successful");
      } else {
        setMessage(result.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      setMessage("Upload failed. Please try again.");
    } finally {
      setIsUploading(false); // Stop upload indicator
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          Upload an Image
        </h2>

        {/* Upload Box */}
        <label className="block w-full p-4 border-2 border-dashed border-gray-400 rounded-lg text-center text-gray-600 cursor-pointer hover:bg-gray-100">
          <span>{file ? file.name : "Click to select a file"}</span>
          <input type="file" onChange={handleFileChange} className="hidden" />
        </label>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className={`w-full mt-4 py-2 text-lg font-semibold text-white rounded-lg transition ${
            isUploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>

        {/* Message */}
        {message && (
          <p className="mt-3 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}
