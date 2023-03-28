import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetCameraImage, selectCameraImage } from './features/cameraSlice';
import './Preview.css';
import CloseIcon from '@material-ui/icons/Close';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CreateIcon from '@material-ui/icons/Create';
import NoteIcon from '@material-ui/icons/Note';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CropIcon from '@material-ui/icons/Crop';
import TimerIcon from '@material-ui/icons/Timer';
import SendIcon from '@material-ui/icons/Send';
import { v4 as uuidv4 } from 'uuid';
import { db } from './firebase';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import { useState } from 'react';
import { serverTimestamp,collection, addDoc, } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { selectUser } from './features/appSlice';

function Preview() {
  const cameraImage = useSelector(selectCameraImage);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState('');
  const storage = getStorage();

  useEffect(() => {
    if (!cameraImage) {
      navigate('/', { replace: true });
    }
  }, [cameraImage, navigate]);

  const closePreview = () => {
    dispatch(resetCameraImage());
  };


  const sendPost = () => {
    const id = uuidv4();
    const storageRef = ref(storage, `posts/${id}`);
  
    uploadString(storageRef, cameraImage, 'data_url').then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        addDoc(collection(db, 'posts'), {
          imageUrl: url,
          username: user.username,
          read: false,
          profilePic: user.profilePic,
          timestamp: serverTimestamp(),
        }).then(() => {
          navigate('/chats', { replace: true });
        });
      });
    }).catch((error) => {
      console.log(error);
    });
  };


  return (
    <div className='preview'>
      <CloseIcon onClick={closePreview} className='preview_close' />
      <div className='preview_toolbarRight'>
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>

      <img src={cameraImage} alt='' />

      <div onClick={sendPost} className='preview_footer'>
        <h2>Next</h2>
        <SendIcon fontSize='small' className='preview_sendIcon' />
      </div>
    </div>
  );
}

export default Preview;
