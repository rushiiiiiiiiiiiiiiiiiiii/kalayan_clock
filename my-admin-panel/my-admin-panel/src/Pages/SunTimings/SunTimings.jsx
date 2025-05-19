import React, { useState, useEffect } from "react";
import { API_ENDPOINTS } from "../../config";

const SunTimings = () => {
  const [date, setDate] = useState("");
  const [id,setid]=useState()
  const [Suryoday, setSuryoday] = useState("");
  const [Suryasta, setSuryasta] = useState("");
  const [sunTimingsTable, setSunTimingsTable] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchSunTimingsTable = async () => {
    try {
      const response = await fetch("http://localhost:5100/get_all_data");
      const data = await response.json();

      if (response.ok) {
        console.log(data)
        setSunTimingsTable(data || []);
      } else {
        alert("Error fetching table data: " + data.message);
      }
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  const handleChange = async () => {
    try {
      const response = await fetch("http://localhost:5100/update_details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date, Suryoday, Suryasta,id }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Updated Successfully!");
        fetchSunTimingsTable(); // Refresh table
        setShowForm(false); // Hide form
        setDate("");
        setSuryoday("");
        setSuryasta("");
      } else {
        alert("Error updating data: " + result.message);
      }
    } catch (error) {
      console.error("Error updating sun timings:", error);
    }
  };

  useEffect(() => {
    fetchSunTimingsTable();
  }, []);

  const handleEdit = (entry) => {
    setid(entry.Id)
    setDate(entry.date);
    setSuryoday(entry.Suryoday);
    setSuryasta(entry.Suryasta);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setDate("");
    setSuryoday("");
    setSuryasta("");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">

      {/* Table Section */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl mb-8">
        <h3 className="text-lg font-semibold mb-4 text-center">Sun Timings Table</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm text-center">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Suryoday</th>
                <th className="py-2 px-4 border">Suryasta</th>
                <th className="py-2 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {sunTimingsTable.length > 0 ? (
                sunTimingsTable.map((entry, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border">{entry.Gregorian_date}</td>
                    <td className="py-2 px-4 border">{entry.Suryoday}</td>
                    <td className="py-2 px-4 border">{entry.Suryasta}</td>
                    <td className="py-2 px-4 border">
                      <button
                        onClick={() => handleEdit(entry)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-4 text-gray-500">No data found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Section - Shown only when editing */}
      {showForm && (
        <div className="w-full bg-gray-800 h-[100vh] fixed flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-md w-96 fixed">
          <h2 className="text-lg font-bold mb-4 text-center">Edit Sun Timings</h2>

          <label className="block mb-2">Select Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />

          <label className="block mb-2">Suryoday:</label>
          <input
            type="time"
            value={Suryoday}
            onChange={(e) => setSuryoday(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />

          <label className="block mb-2">Suryasta:</label>
          <input
            type="time"
            value={Suryasta}
            onChange={(e) => setSuryasta(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />

          <div className="flex justify-between">
            <button
              onClick={handleChange}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Update
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default SunTimings;
