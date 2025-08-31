"use client";

import React, { useState } from "react";

interface Character {
  id: string;
  name: string;
  avatarLetter: string;
  avatarColor: string;
  description: string;
  messages: number;
  likes: number;
  greeting: string;
}

const HomePage: React.FC = () => {
  const [characters] = useState<Character[]>([
    {
      id: "einstein",
      name: "Albert Einstein",
      avatarLetter: "E",
      avatarColor: "bg-blue-500",
      description:
        "Theoretical physicist and genius. Ask me about relativity, physics, or life!",
      messages: 2100000,
      likes: 156000,
      greeting:
        "Hello! I'm Albert Einstein. I'm delighted to meet you! What would you like to discuss today? Perhaps some physics, or maybe you have questions about the universe?",
    },
    {
      id: "sherlock",
      name: "Sherlock Holmes",
      avatarLetter: "SH",
      avatarColor: "bg-amber-600",
      description: "The world's greatest detective. Bring me your mysteries to solve!",
      messages: 1800000,
      likes: 134000,
      greeting:
        "Good day! Sherlock Holmes at your service. I observe you've come seeking my assistance. What mystery shall we unravel together today?",
    },
    {
      id: "shakespeare",
      name: "William Shakespeare",
      avatarLetter: "WS",
      avatarColor: "bg-purple-600",
      description: "The Bard himself! Let's discuss poetry, drama, and the human condition.",
      messages: 1500000,
      likes: 98000,
      greeting:
        "Greetings, dear friend! 'Tis William Shakespeare, humble servant of the written word. Shall we discourse on matters of love, life, or perhaps the beauty of language itself?",
    },
    {
      id: "socrates",
      name: "Socrates",
      avatarLetter: "S",
      avatarColor: "bg-green-600",
      description: "Ancient Greek philosopher. Let's explore wisdom and question everything!",
      messages: 1200000,
      likes: 87000,
      greeting:
        "Welcome, my friend! I am Socrates. I know nothing except that I know nothing. What questions shall we explore together in our pursuit of wisdom?",
    },
  ]);

  const handleCharacterClick = (character: Character) => {
    console.log(`Starting chat with ${character.name}`);
  };

  const formatCount = (count: number): string => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M";
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    }
    return count.toString();
  };

  return (
    <div className="p-6 h-[100%] bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white ml-[250px] overflow-y-auto">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {characters.map((character) => (
            <div
              key={character.id}
              className="relative h-[280px] bg-gradient-to-br from-gray-800 via-gray-900 to-black bg-opacity-60 backdrop-blur-md border border-gray-700 rounded-2xl p-6 cursor-pointer transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_10px_40px_rgba(0,0,0,0.8)] animate-fade-in"
              onClick={() => handleCharacterClick(character)}
            >
              <div
                className={`w-20 h-20 ${character.avatarColor} rounded-full flex items-center justify-center text-white text-2xl mb-4 mx-auto shadow-md`}
              >
                {character.avatarLetter}
              </div>
              <h4 className="font-bold text-xl text-center mb-3">{character.name}</h4>
              <p className="opacity-70 text-sm text-center mb-6 line-clamp-3">
                {character.description}
              </p>
              <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center text-sm opacity-70">
                <span>
                  <i className="fas fa-comments mr-1"></i>
                  {formatCount(character.messages)}
                </span>
                <span>
                  <i className="fas fa-heart mr-1"></i>
                  {formatCount(character.likes)}
                </span>
              </div>
            </div>
          ))}
        </div>
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
