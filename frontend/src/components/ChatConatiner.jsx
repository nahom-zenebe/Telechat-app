import React from 'react'
import { useChartStore } from '../store/useChartStore'
import MessageInput from '../components/MessageInput'
import ChatHeader from '../components/ChatHeader'
import MessageSkeleton from '../components/skeletons/MessageSkeleton'
function ChatConatiner() {
  const{messages,getMessage,isMessageLoading,selectedUser}=useChartStore()


  useEffect(()=>{
    getMessage(selectedUser._id)
  },[selectedUser._id,getMessage])


  if(isMessageLoading) return(
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader/>
      <MessageSkeleton/>
      <MessageInput/>
    </div>
  )


  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader/>
      <p>messages...</p>
      <MessageInput/>

    </div>
  )
}

export default ChatConatiner