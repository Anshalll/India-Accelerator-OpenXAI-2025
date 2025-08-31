import React from 'react'
import Image from 'next/image'
export default function SelectedBotheader({ BotImage , BotName } : {BotName: string, BotImage: string}) {
  return (
    <div className='h-[80px] flex items-center px-[20px] w-full bg-gray-900'>
        <div className='flex items-center gap-[20px]'>
           {BotImage &&  <Image width={20} height={20} src={BotImage} alt='loading' className='rounded-full h-[40px] w-[40px] object-cover'/>}
            <p>{BotName}</p>
        </div>
    </div>
  )
}
