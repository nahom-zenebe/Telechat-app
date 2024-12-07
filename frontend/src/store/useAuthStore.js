import {create} from 'zustand'
import {axiosInstance} from '../lib/axios.js'

import toast from 'react-hot-toast'



export const useAuthStore=create((set)=>({
    authUser:null,
    isSigningup:false,
     isLoggingIn:false,
     isUpdatingProfile:false,
    isCheckingAuth:true,
    onlineUsers:[],
    checkAuth:async()=>{
        try {
            const res=await axiosInstance.get('/auth/check',{ withCredentials: true})

            set({authUser:res.data})
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
            
        } catch (error) {
            
            
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
    }
}))