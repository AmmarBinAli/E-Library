// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDrwiDnMJYcAwcYPFilk619ljvC54enf3o",
  authDomain: "e-learning-d1f90.firebaseapp.com",
  projectId: "e-learning-d1f90",
  storageBucket: "e-learning-d1f90.firebasestorage.app",
  messagingSenderId: "532433882434",
  appId: "1:532433882434:web:17dc5a32274c674ca18cdb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
