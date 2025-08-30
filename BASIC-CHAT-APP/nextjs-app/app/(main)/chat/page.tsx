import React from 'react'
import Chat from '@/components/Chat'
import SelectedBotheader from '@/components/SelectedBotheader'
export default function page() {
  return (
    <div className='w-[calc(100%-20%)] h-[100%]'>
      <SelectedBotheader />
      <Chat />

    </div>
  )
}
