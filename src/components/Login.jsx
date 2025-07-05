import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Username is required.");
      return;
    }

    localStorage.setItem("username", username.trim());
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white/80 backdrop-blur-md shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Task Manager Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <label className="text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
          />
          {error && <p className="text-sm text-red-500 -mt-2">{error}</p>}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition"
          >
            Login
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-4 text-center">
          No password required. Just enter a name to begin!
        </p>
      </div>
    </div>
  );
};

export default Login;

