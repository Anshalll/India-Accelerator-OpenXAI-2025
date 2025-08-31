"use client"

import React, { useState } from "react"

export default function Profile() {
  const [name, setName] = useState("John Smith")
  const [email, setEmail] = useState("john.smith@example.com")
  const [bio, setBio] = useState("AI enthusiast and developer passionate about creating intelligent systems.")
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    setIsEditing(false)
    // Save to backend later
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Profile
          </h1>
          <button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-lg">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-4xl text-white">
                    {name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors">
                      <i className="fas fa-camera text-white"></i>
                    </button>
                  )}
                </div>
                <h2 className="text-xl font-semibold text-center">{name}</h2>
                <p className="text-gray-400 text-center mt-1">Premium Member</p>
                
                <div className="w-full mt-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Completion</span>
                    <span className="font-medium">87%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" 
                      style={{ width: "87%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-gray-800 rounded-2xl p-6 mt-6 border border-gray-700 shadow-lg">
              <h3 className="font-semibold mb-4 text-lg">Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Chats</span>
                  <span className="font-medium">247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Characters</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Member since</span>
                  <span className="font-medium">Jan 2023</span>
                </div>
              </div>
            </div>
          </div>

          {/* Details Card */}
          <div className="md:col-span-2">
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-lg">
              <h3 className="font-semibold mb-6 text-lg">Personal Information</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-400 mb-2">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <p className="bg-gray-700 px-4 py-2 rounded-lg">{name}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-400 mb-2">Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <p className="bg-gray-700 px-4 py-2 rounded-lg">{email}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-400 mb-2">Bio</label>
                  {isEditing ? (
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <p className="bg-gray-700 px-4 py-2 rounded-lg">{bio}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-400 mb-2">Interests</label>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">AI Development</span>
                    <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">Machine Learning</span>
                    <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">Natural Language Processing</span>
                    {isEditing && (
                      <button className="bg-gray-700 hover:bg-gray-600 w-8 h-8 rounded-full flex items-center justify-center">
                        <i className="fas fa-plus text-sm"></i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Connected Accounts */}
            <div className="bg-gray-800 rounded-2xl p-6 mt-6 border border-gray-700 shadow-lg">
              <h3 className="font-semibold mb-6 text-lg">Connected Accounts</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <i className="fab fa-google text-white"></i>
                    </div>
                    <div>
                      <p className="font-medium">Google</p>
                      <p className="text-sm text-gray-400">Connected</p>
                    </div>
                  </div>
                  <button className="text-red-400 hover:text-red-300">
                    Disconnect
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center mr-3">
                      <i className="fab fa-apple text-white"></i>
                    </div>
                    <div>
                      <p className="font-medium">Apple</p>
                      <p className="text-sm text-gray-400">Not connected</p>
                    </div>
                  </div>
                  <button className="text-purple-400 hover:text-purple-300">
                    Connect
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  )
}
