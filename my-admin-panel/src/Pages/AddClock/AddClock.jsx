import { useState } from "react";

const AddClock = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Mobile_No: "",
    Location: "",
    Language: "",
    Date: "",
    password: "",
  });

  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");

    try {
      const response = await fetch("http://192.168.0.103:5101/api/admin/add_customer", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        // ✔ Reset form after success
        setFormData({
          Name: "",
          Mobile_No: "",
          Location: "",
          Language: "",
          Date: "",
          password: "",
        });

        // ✔ Show success message
        setSuccessMsg("User created successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-xl p-6">
        
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Add Clock
        </h2>

        {/* Success Message */}
        {successMsg && (
          <p className="text-green-600 text-center font-medium mb-4">
            {successMsg}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((key) => (
            <div key={key} className="flex flex-col">
              <label
                className="text-gray-700 font-medium mb-1 capitalize"
                htmlFor={key}
              >
                {key.replace(/([A-Z])/g, " $1").trim()}
              </label>

              <input
                id={key}
                type={
                  key === "Date"
                    ? "date"
                    : key === "password"
                    ? "password"
                    : "text"
                }
                name={key}
                placeholder={`Enter ${key.replace(/([A-Z])/g, " $1").trim()}`}
                value={formData[key]}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md 
                focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 
            rounded-md hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClock;
