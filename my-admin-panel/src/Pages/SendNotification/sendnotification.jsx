import { useState, useEffect } from "react";
import { API_ENDPOINTS, BASE_URL } from "../../config";

const SendNotification = () => {
  const [notificationData, setNotificationData] = useState({
    Marathi_text: "",
    Start_time: "",
    End_time: "",
    SendToAll: false,
  });

  const [TV_id, settvid] = useState();
  const [showForm, setShowForm] = useState(false);
  const [clockData, setClockData] = useState([]);
  const [history, setHistory] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [msg, setMsg] = useState("");

  /* ============= FETCH NOTIFICATION HISTORY ============= */
  const fetchHistory = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.FETCH_STORE_NOTIFICATION, {
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) setHistory(data || []);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  /* ============= FETCH ALL TV LIST ============= */
  useEffect(() => {
    fetch(API_ENDPOINTS.FETCH_ALL_TV, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setClockData(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  /* ============= HANDLE INPUT CHANGE ============= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setNotificationData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "Marathi_text") {
      const filtered = history.filter((item) =>
        item.text.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    }
  };

  /* ============= OPEN FORM ============= */
  const handleNotifyClick = (Tv_id) => {
    settvid(Tv_id);
    setShowForm(true);
  };

  /* ============= SUBMIT NOTIFICATION ============= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(BASE_URL + "/send_notification", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ TV_id, ...notificationData }),
      });

      const res = await response.json();

      if (response.ok) {
        setMsg("✅ Notification sent successfully!");

        // Reset form fields
        setNotificationData({
          Marathi_text: "",
          Start_time: "",
          End_time: "",
          SendToAll: false,
        });

        settvid(null);
        setSuggestions([]);
        setShowForm(false); // Close form
        fetchHistory(); // Refresh suggestions
      } else {
        setMsg("❌ Failed to send notification");
      }
    } catch (error) {
      console.log(error);
      setMsg("❌ Something went wrong");
    }

    setTimeout(() => setMsg(""), 3000); // Clear message
  };

  return (
    <div className="min-h-screen flex flex-col items-center w-full px-6 py-10">
      <div className="w-full max-w-none mx-auto">
        {/* CLOCK TABLE */}
        <div className="w-full mx-auto p-10 bg-white rounded-lg shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            List of Clocks
          </h2>

          <table className="w-full border-collapse border border-gray-400 rounded-md text-lg table-fixed">
            <thead>
              <tr className="bg-indigo-500 text-white">
                <th className="border p-4">TV_ID</th>
                <th className="border p-4">Tv Name</th>
                <th className="border p-4">Location</th>
                <th className="border p-4">Status</th>
                <th className="border p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {clockData?.map((clock, index) => (
                <tr
                  key={index}
                  className="text-center hover:bg-indigo-100 transition"
                >
                  <td className="border p-4 font-semibold">{clock?.Tv_id}</td>
                  <td className="border p-4">{clock?.Name}</td>
                  <td className="border p-4">{clock?.Location}</td>
                  <td className="border p-4">{clock?.Status}</td>

                  <td className="border p-4">
                    <button
                      onClick={() => handleNotifyClick(clock.Tv_id)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                    >
                      Notify
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* SUCCESS MESSAGE */}
        {msg && (
          <p className="mt-5 text-xl text-green-600 font-semibold text-center">
            {msg}
          </p>
        )}

        {/* NOTIFICATION FORM */}
        {showForm && (
          <div className="w-full max-w-3xl mt-12 p-10 bg-white rounded-lg shadow-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
              Send Notification
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Notification Text */}
              <div>
                <label className="text-gray-700 font-semibold text-lg mb-2 block">
                  Notification
                </label>

                <div className="relative w-full">
                  <input
                    name="Marathi_text"
                    value={notificationData.Marathi_text}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-xl text-lg shadow-sm focus:ring-2 focus:ring-indigo-500 transition-all"
                    placeholder="Type notification..."
                  />

                  {suggestions.length > 0 && (
                    <ul className="absolute w-full bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-48 overflow-y-auto mt-1">
                      {suggestions.map((item) => (
                        <li
                          key={item.id}
                          onClick={() => {
                            setNotificationData((prev) => ({
                              ...prev,
                              Marathi_text: item.text,
                            }));
                            setSuggestions([]);
                          }}
                          className="px-4 py-3 cursor-pointer hover:bg-indigo-50 text-gray-700 text-[17px]"
                        >
                          {item.text}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Start Time */}
              <div>
                <label className="text-gray-700 font-semibold text-lg mb-2 block">
                  Start Time
                </label>
                <input
                  type="time"
                  name="Start_time"
                  value={notificationData.Start_time}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-400 rounded-lg text-lg"
                />
              </div>

              {/* End Time */}
              <div>
                <label className="text-gray-700 font-semibold text-lg mb-2 block">
                  End Time
                </label>
                <input
                  type="time"
                  name="End_time"
                  value={notificationData.End_time}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-400 rounded-lg text-lg"
                />
              </div>

              {/* Send to All */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="SendToAll"
                  checked={notificationData.SendToAll}
                  onChange={handleChange}
                  className="w-6 h-6 text-indigo-600"
                />
                <label className="ml-3 text-gray-700 font-semibold text-lg">
                  Send to All Clocks
                </label>
              </div>

              {/* Buttons */}
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-indigo-600 text-white font-bold px-6 py-3 rounded hover:bg-indigo-700 transition"
                >
                  Send Notification
                </button>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-400 text-white font-bold px-6 py-3 rounded hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SendNotification;

