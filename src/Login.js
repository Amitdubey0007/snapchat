import { Button } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from './features/appSlice'
import { auth, provider } from './firebase'
import "./Login.css"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";


function Login() {
    const dispatch = useDispatch();

    const signIn = async () => {
        try {
          const result = await signInWithPopup(auth, provider);
          dispatch(
            login({
              username: result.user.displayName,
              profilePic: result.user.photoURL,
              id: result.user.uid,
            })
          );
        } catch (error) {
          alert(error.message);
        }
      };

  return (
    <div className='login'>
    <div className="login_container">
        <img src="https://images.indianexpress.com/2022/04/Snapchat-logo.jpg" alt="" />
        <Button variant="outlined" onClick={signIn}>Sign In</Button>
    </div>
      
    </div>
  )
}

export default Login
