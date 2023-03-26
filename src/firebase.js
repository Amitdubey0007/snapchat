import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage, ref } from 'firebase/storage';



const firebaseConfig = {
    apiKey: "AIzaSyBmaHDusMidezy4KwEYOj5khg04c4vmAcw",
    authDomain: "snapchat-clone-a3867.firebaseapp.com",
    databaseURL: "https://snapchat-clone-a3867-default-rtdb.firebaseio.com",
    projectId: "snapchat-clone-a3867",
    storageBucket: "snapchat-clone-a3867.appspot.com",
    messagingSenderId: "840420175366",
    appId: "1:840420175366:web:396662467e881d14dc1d87"
  };
  
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const storage = getStorage(app);
  
  export  { app, db, auth, provider, storage };