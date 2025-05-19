import React, { useState, useEffect } from "react";

const SendNotification = () => {
  let url = "http://192.168.0.117:5100";
  const [notificationData, setNotificationData] = useState({
    Marathi_text: "",
    Start_time: "", // Start time
    End_time: "",   // End time
  });
  const [tvid, settvid] = useState();
  const [showForm, setShowForm] = useState(false);
  const [clockData, setClockData] = useState([]);

  const notificationOptions = ["Message 1", "Message 2", "Message 3"];

  // 🔁 Fetch clock data from API
  useEffect(() => {
    fetch(url + "/api/clocks") // Replace with your actual endpoint
      .then((res) => res.json())
      .then((data) => setClockData(data))
      .catch((error) => console.error("Error fetching clock data:", error));
  }, []);

  const handleChange = (e) => {
    setNotificationData({
      ...notificationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNotifyClick = (a) => {
    settvid(a);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const send = await fetch(url + "/send_notification", {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({tvid,...notificationData}),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const alldata = async () => {
    try {
      const response = await fetch(url + "/all_tv");
      const result = await response.json();
      setClockData(result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    alldata();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center w-full px-6 py-10">
      <div className="w-full max-w-none mx-auto">
        {/* Clock Table */}
        <div className="w-full mx-auto p-10 bg-white rounded-lg shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">List of Clocks</h2>
          <table className="w-full border-collapse border border-gray-400 rounded-md text-lg table-fixed">
            <thead>
              <tr className="bg-indigo-500 text-white">
                <th className="border p-4">TVID</th>
                <th className="border p-4">Name</th>
                <th className="border p-4">Location</th>
                <th className="border p-4">Latitude</th>
                <th className="border p-4">Longitude</th>
                <th className="border p-4">Language</th>
                <th className="border p-4">Status</th>
                <th className="border p-4">Subscription</th>
                <th className="border p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {clockData.map((clock, index) => (
                <tr key={index} className="text-center hover:bg-indigo-100 transition">
                  <td className="border p-4 font-semibold">{clock.TVID}</td>
                  <td className="border p-4">{clock.Name}</td>
                  <td className="border p-4">{clock.Location}</td>
                  <td className="border p-4">{clock.Latitude}</td>
                  <td className="border p-4">{clock.Longitude}</td>
                  <td className="border p-4">{clock.Language}</td>
                  <td className="border p-4">{clock.Status}</td>
                  <td className="border p-4">{clock.Subscription}</td>
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

        {/* Notification Form */}
        {showForm && (
          <div className="w-full max-w-3xl mt-12 p-10 bg-white rounded-lg shadow-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Send Notification</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-gray-700 font-semibold text-lg mb-2 block">Notification</label>
                <input
                  name="Marathi_text"
                  value={notificationData.Marathi_text}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-400 rounded-lg text-lg"
                />
              </div>

              {/* Start Time */}
              <div>
                <label className="text-gray-700 font-semibold text-lg mb-2 block">Start Time</label>
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
                <label className="text-gray-700 font-semibold text-lg mb-2 block">End Time</label>
                <input
                  type="time"
                  name="End_time"
                  value={notificationData.End_time}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-400 rounded-lg text-lg"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="SendToAll"
                  checked={notificationData.SendToAll}
                  onChange={handleChange}
                  className="w-6 h-6 text-indigo-600"
                />
                <label className="ml-3 text-gray-700 font-semibold text-lg">Send to All Clocks</label>
              </div>

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