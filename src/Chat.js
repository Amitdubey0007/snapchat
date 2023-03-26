import { Avatar } from '@material-ui/core'
import React from 'react'
import "./Chat.css"
import StopIcon from '@material-ui/icons/Stop';
import ReactTimeago from 'react-timeago';
import { selectImage, selectUser } from './features/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { db } from './firebase';
import { doc, setDoc  } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Chat({id, profilePic,username, timestamp, imageUrl, read}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUser);

    const open = async() =>{
        if(!read){
            dispatch(selectImage(imageUrl));
            const postRef = doc(db, "posts", id);
            await setDoc(postRef, { read: true }, { merge: true });

            navigate("/chats/view")
        }
    }

  return (
    <div onClick={open} className='chat'>
      <Avatar src={user.profilePic} className='chat_avatar' />
      <div className="chat_info">
        <h4>{username}</h4>
        <p>
        {!read && "Tap to view -" }  <ReactTimeago date= {new Date(timestamp?.toDate()).toUTCString()}/> </p>
      </div>
      {!read && <StopIcon className='chat_readIcon' />}
    </div>
  )
}

export default Chat
