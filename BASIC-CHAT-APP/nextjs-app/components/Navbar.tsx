"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Bot {
  _id: string;
  name: string;
  desc: string;
  image: string;
}

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Bot[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [user, setUser] = useState<{
    name: string;
    username: string;
    profileicon?: string;
  } | null>(null);


  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", { method: "POST" });
      if (res.ok) {
        router.push("/login");
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };


  // fetch user info from API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/getuserinfo", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          console.error("Failed to fetch user");
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  // handle search
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      const res = await fetch("/api/getsearchedbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ term: searchQuery }),
      });

      if (!res.ok) {
        console.error("Search failed");
        return;
      }

      const data = await res.json();
      setResults(data.bots || []);
    } catch (err) {
      console.error("Error searching:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="w-full h-[80px] bg-gradient-to-r from-purple-900 to-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 4C10.4178 4 8.87103 4.46919 7.55544 5.34824C6.23985 6.22729 5.21447 7.47672 4.60897 8.93853C4.00347 10.4003 3.84504 12.0089 4.15372 13.5607C4.4624 15.1126 5.22433 16.538 6.34315 17.6569C7.46197 18.7757 8.88743 19.5376 10.4393 19.8463C11.9911 20.155 13.5997 19.9965 15.0615 19.391C16.5233 18.7855 17.7727 17.7602 18.6518 16.4446C19.5308 15.129 20 13.5823 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
            Takora AI
          </span>
        </div>

        {/* Search */}
        {isSearchOpen && (
          <div className="flex-1 max-w-2xl mx-8 relative">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search characters, conversations, and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 pl-10 pr-4 bg-purple-800 text-white rounded-lg border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                autoFocus
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg
                  className="h-5 w-5 text-purple-400 hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </form>

            {/* Results Dropdown */}
            {searchQuery && (
              <div className="absolute top-[105%] left-0 w-full bg-gray-900 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                {loading ? (
                  <p className="p-3 text-gray-400">Searching...</p>
                ) : results.length > 0 ? (
                  results.map((bot) => (
                    <Link
                      key={bot._id}
                      href={`/chat/${bot._id}`}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 transition-colors"
                    >
                      <img
                        src={bot.image}
                        alt={bot.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">{bot.name}</p>
                        <p className="text-sm text-gray-400 truncate">
                          {bot.desc.slice(0, 20)}...
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="p-3 text-gray-400">No results found.</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {!isSearchOpen && (
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full hover:bg-purple-800 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          )}


          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              {user?.profileicon ? (
                <img
                  src={user.profileicon}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "?"}
                </div>
              )}
              <span className="hidden md:block font-medium">
                {user?.name || "Guest"}
              </span>
              <svg
                className={`w-4 h-4 transition-transform ${isProfileOpen ? "rotate-180" : ""
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl py-2 z-50">
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-purple-700 transition-colors"
                >
                  Profile
                </Link>

                <div className="border-t border-gray-700 my-2"></div>
                <button onClick={handleLogout} className="block px-4 py-2 hover:bg-purple-700 transition-colors text-red-400">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
