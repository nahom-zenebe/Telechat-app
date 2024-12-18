import React,{useEffect, useRef } from 'react'
import { useChartStore } from '../store/useChartStore'
import MessageInput from '../components/MessageInput'
import ChatHeader from '../components/ChatHeader'
import MessageSkeleton from '../components/skeletons/MessageSkeleton'
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utilis";
import avator from '../public/avatar.png'
const ChatConatiner=()=> {
  const{message,getMessage,isMessagesLoading,selectedUser,subscribeToMessage,unsubscribeFromMessage}=useChartStore()
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  console.log(isMessagesLoading)

  useEffect(()=>{

    getMessage(selectedUser._id)
    subscribeToMessage()
    return ()=>unsubscribeFromMessage
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
     <div className='flex-1 overflow-y-auto p-4 space-y-4'>
     {message.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || avator
                      : selectedUser.profilePic ||avator
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
     </div>
      <MessageInput/>

    </div>
  )
}

export default ChatConatiner