"use client"

import React, { useState } from "react";

export default function CreateBotPage() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState<string>("");
  const [role, setrole] = useState<string>("")
  const [message, setMessage] = useState("");
  
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Handle image url
  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.value);
    setPreview(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/createbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, desc, image , role }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Bot created successfully!");
        setName("");
        setDesc("");
        setImage("");
        setPreview("");
      } else {
        setMessage(data.error || "Failed to create bot.");
      }
    } catch {
      setMessage("An error occurred.");
    }
  };

  return (
    <div className="flex items-center justify-center  h-[calc(100vh-80px)] bg-gradient-to-br from-gray-900 via-gray-800 to-black w-[calc(100%-20%)] text-white overflow-hidden">
      <div className="bg-gray-900 w-full  items-center justify-center flex gap-8 h-full">

        {/* LEFT: FORM */}
        <form
          onSubmit={handleSubmit}
          className=" rounded-2xl p-6 w-[40%]   flex flex-col justify-between h-full"
        >
          <h2 className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
            Create AI Bot
          </h2>

          <div className="space-y-4 p-2 flex flex-col overflow-hidden">
            <div>
              <label className="block text-sm font-medium mb-1">Bot Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g., HelperBot"
                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Bot Role</label>
              <input
                type="text"
                value={role}
                onChange={e => setrole(e.target.value)}
                placeholder="Unique username"
                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={desc}
                onChange={e => setDesc(e.target.value)}
                rows={2}
                placeholder="What does your bot do?"
                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Bot Image URL</label>
              <input
                type="text"
                value={image}
                onChange={handleImageUrlChange}
                placeholder="Paste image URL"
                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Or Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-between">
         
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Create
            </button>
          </div>

          {message && <p className="mt-2 text-center text-pink-400">{message}</p>}
        </form>

        {/* RIGHT: PREVIEW */}
        <div className="  p-6 w-[40%] flex flex-col justify-center items-center h-full">
          <h2 className="text-xl font-bold mb-4 text-pink-400">Live Preview</h2>
          <div className="w-60 h-60 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center mb-6 overflow-hidden">
            {preview ? (
              <img src={preview} alt="Bot Preview" className="w-full h-full object-cover rounded-full" />
            ) : (
              <span className="text-5xl font-bold text-white">{name.charAt(0) || "?"}</span>
            )}
          </div>
          <h3 className="text-2xl font-bold">{name || "Bot Name"}</h3>
          <p className="text-lg text-gray-300">{role || "Role"}</p>
          <p className="text-sm text-gray-400 italic">{desc || "Bot description..."}</p>
        </div>
      </div>
    </div>
  );
}
