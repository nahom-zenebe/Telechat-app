import {create} from 'zustand'
import {axiosInstance} from '../lib/axios.js'
import toast from "react-hot-toast"
import axios from 'axios'



export const useChartStore=create((set)=>({
message:[],
users:[],
selectedUser:null,
isUserLoading:false,
isMessageLoading:false,

getUsers:async()=>{
    set({isUserLoading:true})
    try {
        const res=await axiosInstance.get('/message/users')
        set({users:res.data})


        
    } catch (error) {
        toast.error(error.response.data.message)
        
    }
    finally{
        set({isUserLoading:false})
    }
},
getMessage:async(userId)=>{
    set({isMessageLoading:true})
    try {
        const res=await axiosInstance.get(`/message/${userId}`)
          set({message:res.data})
    } catch (error) {
        toast.error(error.response.data.message)
        
    }
    finally{
        set({isMessageLoading:false})
    }
},
setSelectedUser:(selectedUser)=>set({selectedUser})



}))
