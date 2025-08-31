"use client";

import React, { useState } from "react";

interface CreateCharacterScreenProps {
  onCancel: () => void;
  onCreateCharacter: (characterData: CharacterData) => void;
}

interface CharacterData {
  name: string;
  shortDescription: string;
  longDescription: string;
  greeting: string;
  category: string;
  visibility: string;
}

const CreateCharacterScreen: React.FC<CreateCharacterScreenProps> = ({
  onCancel,
  onCreateCharacter,
}) => {
  const [formData, setFormData] = useState<CharacterData>({
    name: "",
    shortDescription: "",
    longDescription: "",
    greeting: "",
    category: "Education",
    visibility: "Public",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateCharacter(formData);
  };

  return (
    <div className="ml-[250px] mt-[70px] h-[calc(100vh-70px)] p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      <div className="grid grid-cols-2 gap-8 h-full">
        
        {/* LEFT: FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 bg-opacity-70 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 shadow-2xl flex flex-col justify-between h-full"
        >
          <h2 className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
            Create Your Character
          </h2>

          <div className="space-y-4 flex-grow overflow-hidden">
            <div>
              <label className="block text-sm font-medium mb-1">Character Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Wise Mentor"
                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Short Description</label>
              <input
                type="text"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                placeholder="A brief tagline"
                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Long Description</label>
              <textarea
                name="longDescription"
                value={formData.longDescription}
                onChange={handleInputChange}
                rows={2}
                placeholder="Describe your character..."
                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Greeting</label>
              <textarea
                name="greeting"
                value={formData.greeting}
                onChange={handleInputChange}
                rows={2}
                placeholder="How your character greets others..."
                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-pink-500 outline-none"
              >
                <option>Education</option>
                <option>Entertainment</option>
                <option>Gaming</option>
                <option>Health</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Visibility</label>
              <select
                name="visibility"
                value={formData.visibility}
                onChange={handleInputChange}
                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-pink-500 outline-none"
              >
                <option>Public</option>
                <option>Private</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Create
            </button>
          </div>
        </form>

        {/* RIGHT: PREVIEW */}
        <div className="bg-gray-900 bg-opacity-70 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 shadow-2xl flex flex-col justify-center items-center h-full">
          <h2 className="text-xl font-bold mb-4 text-pink-400">Live Preview</h2>
          <div className="w-60 h-60 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center mb-6">
            <span className="text-5xl font-bold text-white">
              {formData.name.charAt(0) || "?"}
            </span>
          </div>
          <h3 className="text-2xl font-bold">{formData.name || "Character Name"}</h3>
          <p className="text-lg text-gray-300">{formData.shortDescription || "Tagline"}</p>
          <p className="text-sm text-gray-400 italic">{formData.greeting || "Greeting..."}</p>
        </div>
      </div>
    </div>
  );
};

export default CreateCharacterScreen;
