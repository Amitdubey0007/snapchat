import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import "./Chats.css"
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { auth, db } from './firebase';
import Chat from './Chat';
import { getFirestore, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import 'firebase/compat/firestore';
import { selectUser } from './features/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useNavigate } from 'react-router-dom';
import { resetCameraImage } from './features/cameraSlice';

function Chats() {

  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const takeSnap = ()=>{
    dispatch(resetCameraImage())
    navigate("/")
  }

  useEffect(() => {
    const postsRef = collection(db, 'posts');
    const orderedPosts = query(postsRef, orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(orderedPosts, (snapshot) => {
      setPosts(
        snapshot.docChanges().map((change) => ({
          id: change.doc.id,
          data: change.doc.data(),
        }))
      );
    });

    return () => unsubscribe();
  }, []);
  


  return (
    <div className='chats'>
      <div className="chats_headers">
        <Avatar src={user.profilePic} onClick={()=> auth.signOut()} className="chats_avatar"/>
        <div className="chats_search">
          <SearchIcon className='chats_searchIcon' />
          <input placeholder='Friends' type="text" />
        </div>
        <ChatBubbleIcon className='chats_chatIcon' />
      </div>
      <div className="chats_posts">
      {posts.map(({id,data:{profilePic,username, timestamp, imageUrl, read}})=>(
          <Chat
          key={id}
          id={id}
          profilePic={profilePic}
          username={username}
          timestamp={timestamp}
          imageUrl={imageUrl}
          read={read}
           />
      ))}
      </div>
      <RadioButtonUncheckedIcon
      className="chats_takePicIcon"
      onClick={takeSnap}
      fontSize="large"
       />
    </div>
  )
}

export default Chats
