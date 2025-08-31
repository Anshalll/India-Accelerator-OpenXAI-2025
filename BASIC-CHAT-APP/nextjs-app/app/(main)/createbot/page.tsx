"use client"

import React, { useState } from "react";
import Image from "next/image";
export default function CreateBotPage() {

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState<string>("");


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

  const handleCreateBot = async () => {
    setMessage("");
    try {
      const response = await fetch("/api/createbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, desc, image }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Bot created successfully!");
        setName("");
        setUsername("");
        setDesc("");
        setImage("");
        setPreview("");
      } else {
        setMessage(data.error || "Failed to create bot.");
      }
    } catch (error) {
      console.log(error);
      
      setMessage("An error occurred.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Create AI Bot</h2>
      <label htmlFor="name">Bot Name</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        className="border px-2 py-1"
        placeholder="Enter bot name"
      />

      <label htmlFor="desc">Description</label>
      <textarea
        id="desc"
        value={desc}
        onChange={e => setDesc(e.target.value)}
        className="border px-2 py-1"
        placeholder="Describe your bot"
      />

      <label htmlFor="image">Bot Image URL</label>
      <input
        id="image"
        type="text"
        value={image}
        onChange={e => {
          setImage(e.target.value);
          setPreview(e.target.value);
        }}
        className="border px-2 py-1"
        placeholder="Paste image URL or upload below"
      />

      <label htmlFor="upload">Or Upload Image</label>
      <input
        id="upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="border px-2 py-1"
      />

      {preview && (
        <Image width={40} height={40} src={preview} alt="Bot Preview" className="w-24 h-24 object-cover mx-auto rounded-full mt-2" />
      )}

      <button
        onClick={handleCreateBot}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Create Bot
      </button>

      {message && (
        <div className="mt-2 text-center text-red-500">{message}</div>
      )}
    </div>
  );
}