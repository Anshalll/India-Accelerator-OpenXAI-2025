"use client"

import React, { useState, useEffect } from "react"

export default function Profile() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [bio, setBio] = useState("")
  const [profileIcon, setProfileIcon] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [BotsData, setBotsData] = useState([])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/getuserinfo", {
          method: "GET",
          credentials: "include", // important to send cookies
        })
        const data = await res.json()
        if (res.ok) {
            console.log(data)
          setName(data.user.name || "")
          setEmail(data.user.email || "")
          setBio("AI enthusiast and developer passionate about creating intelligent systems.") // placeholder until you add bio field in DB
          setProfileIcon(data.user.profileicon || "")
        } else {
          console.error("Failed:", data.error)
        }
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const handleSave = async () => {
    setIsEditing(false)
    try {
      const res = await fetch("/api/updateuserinfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, email, bio, profileicon: profileIcon }),
      })
      const data = await res.json()
      if (!res.ok) {
        console.error("Update failed:", data.error)
      }
    } catch (error) {
      console.error("Error updating user:", error)
    }
  }

  if (loading) {
    return (
      <div className="h-[calc(100vh-80px)] flex items-center justify-center text-white">
        Loading profile...
      </div>
    )
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 h-[calc(100vh-80px)]">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Profile
          </h1>
          <button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Picture + Badge */}
          <div className="md:col-span-1">
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-lg">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  {profileIcon ? (
                    <img
                      src={profileIcon}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-purple-500"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-4xl text-white">
                      {name ? name.split(" ").map((n) => n[0]).join("") : "U"}
                    </div>
                  )}
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors">
                      <i className="fas fa-camera text-white"></i>
                    </button>
                  )}
                </div>
                <h2 className="text-xl font-semibold text-center">{name}</h2>
                <p className="text-gray-400 text-center mt-1">Premium Member</p>
              </div>
            </div>
          </div>

                  
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
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <p className="bg-gray-700 px-4 py-2 rounded-lg">{bio}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  )
}
