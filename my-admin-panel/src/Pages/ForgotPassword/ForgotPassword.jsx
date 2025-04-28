import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = (e) => {
    e.preventDefault();
    setMessage("If this email exists, a password reset link has been sent.");
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">Forgot Password</h2>
        {message && <p className="text-green-600 text-center mb-4">{message}</p>}
        
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-4 text-white rounded-lg text-lg bg-blue-500 hover:bg-blue-600"
          >
            Reset Password
          </button>
        </form>

        {/* Back to Login */}
        <button
          onClick={() => navigate("/login")}
          className="mt-4 text-blue-500 hover:underline text-center w-full"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
