import {create} from 'zustand'
import {axiosInstance} from '../lib/axios.js'
import {io} from 'Socket.io-client '
import toast from 'react-hot-toast'


const base_URL="http://localhost:5001"


export const useAuthStore=create((set,get)=>({
    authUser:null,
    isSigningup:false,
     isLoggingIn:false,
     isUpdatingProfile:false,
    isCheckingAuth:true,
    onlineUsers:[],
    socket:null
    ,
    checkAuth:async()=>{
        try {
            const res=await axiosInstance.get('/auth/check',{ withCredentials: true})

            set({authUser:res.data})
            get().connectSocket()
        } catch (error) {
            set({authUser:null})
            console.log("Error in checkAuth",error)
            
        }
        finally{
            set({isCheckingAuth: false})
        }


    },
    signup:async(data)=>{
        set({isSigningup:true})
        try {
           const response= await axiosInstance.post('/auth/signup',data,{ withCredentials: true})
           set({authUser:response.data})
           toast.success('Account Created successfully')
           get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
            
        }
        finally{
            set({isSigningup:false})
        }

    },
    login:async(data)=>{
        try {

            const reponse=await axiosInstance.post('/auth/login',data)
            set({authUser:reponse.data})
            toast.success("Logged in Successfully")

            get().connectSocket()

            
        } catch (error) {
            toast.error("Error in login")
            
        }
        finally{
            set({isLoggingIn:false})
        }
    },
    logout:async()=>{
        try {
            await axiosInstance.post("/auth/logout")
            set({authUser:null})
            toast.success("Logged out successfully")
            get().diconnectSocket()
            
        } catch (error) {
            toast.error(error.response.data.message)
            
        }

    },
    updateProfile:async(data)=>{
        set({isUpdatingProfile:true})

        try {
            const res=await axiosInstance.put('/auth/update-profile',data)
            set({authUser:res.data})
            toast.success("Profile update successfully")
            
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
        }
        finally{
            set({isUpdatingProfile:false})
        }
    },
    connectSocket:()=>{
        const {authUser}=get()
        if(!authUser||get().socket?.connected)return
        const socket=io(base_URL,{
            query:{
                userId:authUser._id

            }
        })
        socket.connect()
        set({socket:socket})
        socket.on("getonlineUsers",(userIds)=>{
            set({onlineUsers:userIds})
        })


    },
    diconnectSocket:()=>{
        if(get().socket?.connected)get().socket.disconnect()

    }
}))