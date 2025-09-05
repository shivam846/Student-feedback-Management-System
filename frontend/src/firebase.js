// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
 // copy and past from d drive stdent feedbak management system folder containg all keys
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
