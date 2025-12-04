import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../config";

// use API_ENDPOINTS.LOGIN in your fetch()

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        credentials: "include", // ✅ REQUIRED
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        navigate("/dashboard"); // ✅ Cookie-based auth
      } else {
        alert(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
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
          <div className="mb-4">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              required
            />
          </div>

          <p className="text-center mt-4">
            <Link
              to="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </p>

          <button
            type="submit"
            className="w-full py-3 mt-4 text-white rounded-lg text-lg bg-blue-500 hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
