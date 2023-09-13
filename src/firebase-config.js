// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#availablibraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJSfPNkFipUBQiiIvXdOOWw4m1t63Zp34",
  authDomain: "build-a-blog-7c0d6.firebaseapp.com",
  projectId: "build-a-blog-7c0d6",
  storageBucket: "build-a-blog-7c0d6.appspot.com",
  messagingSenderId: "198059534230",
  appId: "1:198059534230:web:7cd415935cb38d5f1bdfb7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export default app;
