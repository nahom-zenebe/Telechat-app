import React from 'react'
import {useChartStore} from '../store/useChartStore'
import Sidebar from '../components/Sidebar'
import ChatConatiner from '../components/ChatConatiner'
import NoChatSelected from '../components/NoChatSelected'

function HomePage() {
  const {selectedUser}=useChartStore()

  return (
    <div className='h-screen bg-base-200 pt-20'>
      <div className='flex items-center justify-centerpt-20 px-4'>
        <div className='bg-base-100 rounded-lg shadow-lg w-full max-w-6xl h-[calc(100vh-8rem)]'>
        <div className='flex h-full rounded-lg overflow-hidden'>
          <Sidebar/>

          {
            !selectedUser ? <NoChatSelected/>:<ChatConatiner/>
          }

        </div>
        </div>

      </div>

    </div>
  )
}

export default HomePage