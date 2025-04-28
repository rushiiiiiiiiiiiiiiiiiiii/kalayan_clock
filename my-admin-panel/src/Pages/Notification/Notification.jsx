import React, { useState, useEffect } from "react";
import { API_ENDPOINTS } from "../../config";

const NotificationForm = () => {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [fetchingHistory, setFetchingHistory] = useState(false);

  // Fetch notification history
  const fetchHistory = async () => {
    setFetchingHistory(true);
    try {
      const response = await fetch(API_ENDPOINTS.GET_NOTIFICATIONS);
      const data = await response.json();
      if (response.ok) {
        setHistory(data.notifications || []);
      } else {
        console.error("Failed to fetch history:", data.message);
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setFetchingHistory(false);
    }
  };

  useEffect(() => {
    fetchHistory(); // Fetch history when component loads
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.STORE_NOTIFICATION, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Notification sent successfully!");
        fetchHistory(); // Refresh history
      } else {
        setMessage(data.message || "❌ Failed to send notification.");
      }
    } catch (error) {
      setMessage("⚠️ Error sending notification. Please try again.");
    } finally {
      setLoading(false);
      setText(""); // Clear input
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-gray-100 p-6">
      {/* Notification Form */}
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg mb-8">
        <h2 className="text-3xl font-semibold text-center mb-6">Notification Form</h2>
        {message && (
          <p
            className={`text-center mb-4 ${
              message.includes("successfully") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Add Notification</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 text-white text-lg rounded-lg transition duration-300 ease-in-out ${
              loading ? "bg-gray-900 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Notification"}
          </button>
        </form>
      </div>

      {/* Notification History */}
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Notification History</h2>
        {fetchingHistory ? (
          <p className="text-center text-gray-500">Loading history...</p>
        ) : history.length === 0 ? (
          <p className="text-center text-gray-500">No notifications sent yet.</p>
        ) : (
          <ul className="max-h-64 overflow-y-auto border rounded-lg p-4 bg-gray-50">
            {history.map((item, index) => (
              <li key={index} className="p-2 border-b last:border-none">
                📢 {item.text} <span className="text-gray-500 text-sm">({item.timestamp})</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationForm;
