'use client'

import React, { useState } from 'react'
import Chat from '@/components/Chat'
import SelectedBotheader from '@/components/SelectedBotheader'

const Page = () => {   

  const [BotName, setBotname] = useState<string>("")
  const [BotImage, setBotImage] = useState<string>("")

  return (
    <div className='w-[calc(100%-20%)] h-[100%]'>
      <SelectedBotheader BotName={BotName} BotImage={BotImage} />
      <Chat setBotImage={setBotImage} setBotname={setBotname} />
    </div>
  )
}

export default Page   
