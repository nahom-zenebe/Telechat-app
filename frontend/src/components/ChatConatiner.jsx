import React,{useEffect} from 'react'
import { useChartStore } from '../store/useChartStore'
import MessageInput from '../components/MessageInput'
import ChatHeader from '../components/ChatHeader'
import MessageSkeleton from '../components/skeletons/MessageSkeleton'

const ChatConatiner=()=> {
  const{messages,getMessage,isMessagesLoading,selectedUser}=useChartStore()

 

  console.log(isMessagesLoading)

  useEffect(()=>{

    getMessage(selectedUser._id)
  },[selectedUser._id,getMessage])



  if(isMessagesLoading){
    return(
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader/>
      <MessageSkeleton/>
      <MessageInput/>
    </div>)
  }


  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader/>
      <p>messages...</p>
      <MessageInput/>

    </div>
  )
}

export default ChatConatiner