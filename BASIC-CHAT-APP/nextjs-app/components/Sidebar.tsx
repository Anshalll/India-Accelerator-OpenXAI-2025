"use client";
import React from 'react';

interface ChatItem {
  id: number;
  name: string;
  lastMessage: string;
}

const Sidebar: React.FC = () => {
  const recentChats: ChatItem[] = [
    { id: 1, name: 'Einstein', lastMessage: 'Physics discussion' },
    { id: 2, name: 'Sherlock', lastMessage: 'Mystery solving' },
    { id: 3, name: 'Tesla', lastMessage: 'Energy innovation' },
    { id: 4, name: 'Da Vinci', lastMessage: 'Art and design' }
  ];

  return (
    <div className="fixed  h-[calc(100vh-80px)] w-64 bg-gray-900 text-white flex flex-col overflow-hidden border-r border-gray-700">
      {/* Navigation Section */}
      <div className="p-5 border-b border-gray-700">
        <h2 className="text-xs uppercase text-gray-400 mb-4 tracking-wider font-semibold">NAVIGATION</h2>
        <ul className="space-y-2">
          <li className="flex items-center py-2 px-3 rounded-lg cursor-pointer transition-colors bg-blue-600 hover:bg-blue-700">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="font-medium">Characters</span>
          </li>
          <li className="flex items-center py-2 px-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-800">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="font-medium">Create</span>
          </li>
          <li className="flex items-center py-2 px-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-800">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span className="font-medium">Favorites</span>
          </li>
        </ul>
      </div>

      {/* Recent Chats Section */}
      <div className="flex-1 Scroller overflow-y-auto p-5">
        <h2 className="text-xs uppercase text-gray-400 mb-4 tracking-wider font-semibold">RECENT CHATS</h2>
        <ul className="space-y-3">
          {recentChats.map(chat => (
            <li key={chat.id} className="flex items-start p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-800">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full w-10 h-10 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-white font-semibold text-sm">{chat.name.charAt(0)}</span>
              </div>
              <div className="overflow-hidden">
                <p className="font-medium truncate text-gray-100">{chat.name}</p>
                <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* App Name at Bottom */}
      <div className="p-4 border-t border-gray-700 bg-gray-850 text-center">
        <p className="text-sm text-gray-400">Takora AI</p>
      </div>
    </div>
  );
};

export default Sidebar;