import {create} from 'zustand'
import {axiosInstance} from '../lib/axios.js'
import toast from "react-hot-toast"
import axios from 'axios'
import { subscribe } from '../../../backend/Router/authRoute.js'
import { useAuthStore } from './useAuthStore.js'



export const useChartStore=create((set,get)=>({
message:[],
users:[],
selectedUser:null,
isUserLoading:false,
isMessagesLoading:false,

getUsers:async()=>{
    set({isUserLoading:true})
    try {
        const res=await axiosInstance.get('/message/user')
        set({users:res.data})


        
    } catch (error) {
        toast.error(error.response.data.message)
        
    }
    finally{
        set({isUserLoading:false})
    }
},
getMessage:async(userId)=>{
    set({isMessagesLoading:true})
    try {
        const res=await axiosInstance.get(`/message/${userId}`)
          set({message:res.data})
    } catch (error) {
        toast.error(error.response.data.message)
        
    }
    finally{
        set({isMessagesLoading:false})
    }
},

sendMessage:async(messageData)=>{
    const {selectedUser,message}=get()

    try {
        const res=await axiosInstance.post(`/message/send/${selectedUser._id}`,messageData)
        set({message:[...message,res.data]})
        
    } catch (error) {
        toast.error(error.response.data.message)
        
    }
subscribeToMessage:()=>{
    const {selectedUser}=get()
    if(!selectedUser)return;

    const socket=useAuthStore.getState().socket;

   socket.on("newMessage",(newMessage)=>{
    set({
        message:[...get().message,newMessage]
    })
   })


}

},
unsubscribeFromMessage:()=>{
    const socket=useAuthStore.getState().socket;
    socket.off("newMessage")
}
,
setSelectedUser:(selectedUser)=>set({selectedUser})



}))
