
import { initializeApp } from "firebase/app";

import {getStorage} from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB66d6h5d6zrO9ev94HHVRdhVnydjXgycg",
  authDomain: "img-upload-22a31.firebaseapp.com",
  projectId: "img-upload-22a31",
  storageBucket: "img-upload-22a31.appspot.com",
  messagingSenderId: "1006312162652",
  appId: "1:1006312162652:web:1c4f6f3a3b3885036ded99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage= getStorage(app);

export {storage};