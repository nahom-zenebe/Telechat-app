import {create} from 'zustand'
import {axiosInstance} from '../lib/axios.js'
import toast from "react-hot-toast"
import axios from 'axios'
 



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
    const {selectedUser,messages}=get()

    try {
        const res=await axiosInstance.post(`message/send/${selectedUser._id}`,messageData)
        set({messages:[...messages,res.data]})
        
    } catch (error) {
        toast.error(error.response.data.message)
        
    }


}
,
setSelectedUser:(selectedUser)=>set({selectedUser})



}))
