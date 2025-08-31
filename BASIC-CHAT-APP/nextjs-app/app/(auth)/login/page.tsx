"use client"

import React, { useState } from 'react';

export default function Page() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    setMessage("");
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        credentials: "include",  // keep session cookie
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ identifier, password })
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Login successful!");
        window.location.href = "/home"
        setIdentifier("");
        setPassword("");
      } else {
        setMessage(data.error || "Login failed.");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex items-center text-black justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-blue-500 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          {/* Header with Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 4C10.4178 4 8.87103 4.46919 7.55544 5.34824C6.23985 6.22729 5.21447 7.47672 4.60897 8.93853C4.00347 10.4003 3.84504 12.0089 4.15372 13.5607C4.4624 15.1126 5.22433 16.538 6.34315 17.6569C7.46197 18.7757 8.88743 19.5376 10.4393 19.8463C11.9911 20.155 13.5997 19.9965 15.0615 19.391C16.5233 18.7855 17.7727 17.7602 18.6518 16.4446C19.5308 15.129 20 13.5823 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Takora AI
            </h1>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <div>
              <label
                htmlFor="identifier"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username or Email
              </label>
              <input
                id="identifier"
                type="text"
                value={identifier}
                onChange={e => setIdentifier(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter username or email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter password"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
            >
              Login
            </button>

            {message && (
              <div
                className={`mt-2 text-center ${
                  message === "Login successful!" ? "text-green-600" : "text-red-500"
                }`}
              >
                {message}
              </div>
            )}
          </div>

          {/* Sign up link */}
          <div className="text-center text-sm text-gray-600 mt-6">
           <p>Dont have an account?</p>{" "}
            <a href="/register" className="text-blue-600 font-medium hover:text-blue-800">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
