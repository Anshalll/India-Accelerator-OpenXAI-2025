"use client";
import { Heart } from 'lucide-react';
import Image from 'next/image';
import React, { useState, useEffect } from "react";
import Link from 'next/link';
interface Bot {
  _id: string;
  name: string;
  image: string;
  desc: string;
  uniqueid: string;
  role?: string;
  messages?: number;
  likes?: number;
}

const HomePage: React.FC = () => {
  const [bots, setBots] = useState<Bot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBots = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/getbotstop");
        const data = await res.json();
        if (res.ok && data.bots) {
          setBots(data.bots);
        }
      } catch {
        setBots([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBots();
  }, []);

  const handleBotClick = (bot: Bot) => {
    console.log(`Starting chat with ${bot.name}`);
    // You can route to chat page here if needed
  };

  const formatCount = (count?: number): string => {
    if (!count) return "0";
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M";
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    }
    return count.toString();
  };

  return (
    <div className="p-6 w-[calc(100%-20%)] h-[100%] bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-y-auto">
      {/* Hero Section */}
      <div className="text-center mb-10 animate-fade-in">
        <h2 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
          Welcome to Takora AI
        </h2>
        <p className="text-xl opacity-80 mb-6">
          Chat with millions of AI characters, or create your own
        </p>
        <button className="bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg hover:scale-105 px-8 py-3 rounded-xl font-semibold transition-all duration-300 animate-bounce-in">
          <i className="fas fa-plus mr-2"></i>Create Character
        </button>
      </div>

      {/* Featured Characters */}
      <div>
        <h3 className="text-3xl font-bold mb-6">Featured Characters</h3>
        {loading ? (
          <div className="text-center text-lg">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      
            {bots.map((bot , key) => (
             
              <Link href={`/chat/${bot.uniqueid}`}
                key={key}
                className="relative h-[280px] bg-gradient-to-br from-gray-800 via-gray-900 to-black bg-opacity-60 backdrop-blur-md border border-gray-700 rounded-2xl p-6 cursor-pointer transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_10px_40px_rgba(0,0,0,0.8)] animate-fade-in"
                onClick={() => handleBotClick(bot)}
              >
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl mb-4 mx-auto shadow-md bg-gray-700 overflow-hidden">
                  {bot.image ? (
                    <Image
                      width={20}
                      height={20}
                      src={bot.image}
                      alt={bot.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    bot.name?.charAt(0)
                  )}
                </div>
                <h4 className="font-bold text-xl text-center mb-3">{bot.name}</h4>
                <p className="opacity-70 text-sm text-center mb-6 line-clamp-3">
                  {bot.desc}
                </p>
                <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center text-sm opacity-70">
                  
                  <span className='flex items-center gap-[10px]'>
                    <Heart size={15}/>
                    {formatCount(bot.likes)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceIn {
          0% { transform: scale(0.3) rotate(-10deg); opacity: 0; }
          50% { transform: scale(1.05) rotate(2deg); }
          70% { transform: scale(0.9) rotate(-1deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
        .animate-bounce-in {
          animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>
    </div>
  );
};

export default HomePage;