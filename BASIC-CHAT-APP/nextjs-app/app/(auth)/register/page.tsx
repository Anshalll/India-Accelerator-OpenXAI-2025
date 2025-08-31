"use client"

import React, { useState } from 'react';

export default function Page() {
  const [Name, setName] = useState<string>("");
  const [Email, setEmail] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const [Username, setUsername] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const HandleRegister = async () => {
    setMessage("");
    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: Username,
          name: Name,
          email: Email,
          password: Password
        })
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Registration successful!");
        setName("");
        setEmail("");
        setPassword("");
        setUsername("");
      } else {
        setMessage(data.error || "Registration failed.");
      }
    } catch (error) {
      console.error(error)
      setMessage("An error occurred.");
    }
  };

  return (
    <div className='flex flex-col gap-[10px] max-w-md mx-auto mt-10'>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        type="text"
        value={Username}
        onChange={e => setUsername(e.target.value)}
        className='border px-2 py-1'
      />

      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        value={Name}
        onChange={e => setName(e.target.value)}
        className='border px-2 py-1'
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={Email}
        onChange={e => setEmail(e.target.value)}
        className='border px-2 py-1'
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={Password}
        onChange={e => setPassword(e.target.value)}
        className='border px-2 py-1'
      />

      <button
        onClick={HandleRegister}
        className='bg-blue-500 text-white px-4 py-2 rounded mt-2'
      >
        Register
      </button>

      {message && (
        <div className='mt-2 text-center text-red-500'>{message}</div>
      )}
    </div>
  );
}