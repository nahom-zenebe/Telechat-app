import Navbar from "./components/Navbar";
import React, { useEffect } from 'react'
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SettingPage from "./pages/SettingPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import { Routes,Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import {useThemeStore} from './store/useThemeStore'
import {Loader} from 'lucide-react'
import { Toaster } from "react-hot-toast";
function App() {

  const {authUser,checkAuth,isCheckingAuth}=useAuthStore()
  
 const{theme}=useThemeStore()


  useEffect(()=>{
    checkAuth()

    

  },[checkAuth])

  console.log(authUser)

  if(isCheckingAuth &&!authUser){

    return (
      <div className="flex items-center justify-center h-screen ">
        <Loader className='size-10 animate-spin'/>
      </div>
    )

  }


  return (
    <div data-theme={theme}>
      <Navbar/>
    <Routes>
    <Route index element={ authUser ? <HomePage/>:<Navigate to='/login'/>} />
    <Route path='/signup' element={!authUser?<SignupPage/>:<Navigate to='/'/>} />
    <Route path='/login' element={!authUser? <LoginPage/>:<Navigate to='/'/>} />
    <Route path='/settings' element={<SettingPage/>} />
    <Route path='/profile' element={authUser ?<ProfilePage/>:<Navigate to='/login'/>}/>

</Routes>
<Toaster/>
</div>
  );
}

export default App;
