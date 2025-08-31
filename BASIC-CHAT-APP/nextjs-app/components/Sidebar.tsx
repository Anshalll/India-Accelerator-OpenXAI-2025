'use client'

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

type Bot = {

  name: string;
  image: string;
  uniqueid: string;

};

export default function Sidebar() {
  const [recentBots, setRecentBots] = useState<Bot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBots = async () => {
      try {
        const res = await fetch('/api/getuserbots', {
          credentials: "include"
        });
        const data = await res.json();

        if (res.ok && data.datatosend) {

          setRecentBots(data.datatosend);
          console.log(data.datatosend)

        }
      } catch (error) {
        console.log(error);

        setRecentBots([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBots();
  }, []);

  return (
    <div className="  h-[calc(100vh-80px)] w-[20%] bg-gray-900 text-white flex flex-col overflow-hidden border-r border-gray-700">
      {/* Navigation Section */}
      <div className="p-5 border-b border-gray-700">
        <h2 className="text-xs uppercase text-gray-400 mb-4 tracking-wider font-semibold">NAVIGATION</h2>
        <ul className="space-y-2">
          <Link href={"/home"} className="flex items-center py-2 px-3 rounded-lg cursor-pointer transition-colors  hover:bg-blue-700">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="font-medium">Characters</span>
          </Link>
          <Link href={'/createbot'} className="flex items-center py-2 px-3 rounded-lg cursor-pointer transition-colors hover:bg-blue-700">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="font-medium">Create</span>
          </Link>
        
        </ul>
      </div>

      {/* Recent Chats Section */}
      <div className="flex-1 Scroller overflow-y-auto p-5">
        <h2 className="text-xs uppercase text-gray-400 mb-4 tracking-wider font-semibold">RECENT CHATS</h2>
        <ul className="space-y-3">
        
          {recentBots.map((bot, key) => (
            <div key={key}>


              <Link href={`/chat/${bot.uniqueid}`} >
                <div className='w-full flex items-center gap-[20px]  bg-gray-800 p-[10px] rounded-lg'>

                  <Image width={10} height={10} src={bot.image} alt="Bot Preview" className="w-8 h-8 object-cover flex mx-auto rounded-full mt-2" />
                  <p className='w-full'>{bot.name}</p>

                </div>
              </Link>

            </div>
          ))}
        </ul>
      </div>

      {/* App Name at Bottom */}
      <div className="p-4 border-t border-gray-700 bg-gray-850 text-center">
        <p className="text-sm text-gray-400">Takora AI</p>
      </div>
    </div>
  )
}

