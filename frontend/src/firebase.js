// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDpCTyPlbHi3WsJlfbLtqeg9V7XW8OnXTM",
  authDomain: "student-feedback-system-45c5c.firebaseapp.com",
  projectId: "student-feedback-system-45c5c",
  storageBucket: "student-feedback-system-45c5c.firebasestorage.app",
  messagingSenderId: "1050471821885",
  appId: "1:1050471821885:web:95bfeac6ddb59ee113b054"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
