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
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ identifier, password })
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Login successful!");
        setIdentifier("");
        setPassword("");
     
      } else {
        setMessage(data.error || "Login failed.");
      }
    } catch (error) {
      console.error(error)
      setMessage("An error occurred.");
    }
  };

  return (
    <div className="flex flex-col gap-3 max-w-md mx-auto mt-10">
      <label htmlFor="identifier">Username or Email</label>
      <input
        id="identifier"
        type="text"
        value={identifier}
        onChange={e => setIdentifier(e.target.value)}
        className="border px-2 py-1"
        placeholder="Enter username or email"
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="border px-2 py-1"
        placeholder="Enter password"
      />

      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Login
      </button>

      {message && (
        <div className="mt-2 text-center text-red-500">{message}</div>
      )}
    </div>
  );
}
