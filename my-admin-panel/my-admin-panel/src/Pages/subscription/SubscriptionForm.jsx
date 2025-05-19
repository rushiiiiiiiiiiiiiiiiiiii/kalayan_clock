import React, { useState } from "react";

const SubscriptionForm = () => {
  const [formData, setFormData] = useState({
    TV_id: "",
    Subscription_type: "",
    amount: "",
    date:"",
  });

  const [message, setMessage] = useState(""); 
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5100/Upload_Plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Subscription added successfully!");
        setFormData({ TV_id: "", subscription_Type: "", amount: "", date: "" });
      } else {
        setMessage(data.message || "Failed to add subscription.");
      }
    } catch (error) {
      setMessage("Error submitting form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">Subscription Form</h2>
        
        {message && (
          <p className={`text-center mb-4 ${message.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          {/* TVID Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Tvid</label>
            <input
              type="text"
              name="TV_id"
              value={formData.TV_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              required
            />
          </div>

          {/* Subscription Type Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Subscription Type</label>
            <select
              name="Subscription_type"
              value={formData.Subscription_type}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              required
            >
              <option value="">Select Subscription Type</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="lifetime">Lifetime</option>
            </select>
          </div>

          {/* Amount Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              required
            />
          </div>

          {/* Location Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium">date</label>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 mt bg-gray-900 text-white text-lg rounded-lg transition duration-300 ease-in-out ${
              loading ? "bg-gray-900 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Subscribe"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionForm;
