import React, { useEffect } from 'react';
import './App.css';
import WebcamCapture from "./WebcamCapture" 
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Preview from './Preview';
import Chats from './Chats';
import ChatView from './ChatView';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/appSlice';
import Login from './Login';
import { auth } from './firebase';

function App() {
const user = useSelector(selectUser)
const dispatch =useDispatch();

useEffect( ()=>{
  auth.onAuthStateChanged((authUser)=>{
    if(authUser){
      dispatch(login({
        username: authUser.uid,
        profilePic:authUser.photoURL,
        id: authUser.uid,
      }))
    }else{
      dispatch(logout())
    }
  })
}, [])

  return (
    <BrowserRouter>
    <div className="app">

    {!user ? <Login/> : (
<>
<img className='chat_logo' src="https://images.indianexpress.com/2022/04/Snapchat-logo.jpg" alt="" />

    <div className='app_body'>
    <div className="app_bodyBackground">

    <Routes>
     <Route  path='/preview' element={<Preview/>} />
     <Route exact path='/' element={<WebcamCapture/>} />
     <Route exact path='/chats' element={<Chats/>} />
     <Route exact path='/chats/view' element={<ChatView/>} />
    </Routes>
    </div>
    </div>
</>
    )
    }
    
    
     
    </div>
    </BrowserRouter>
  );
}

export default App;
