// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgkdF8Sm9PDzyKJjlc4oMVqCKViTTmy5s",
  authDomain: "p2-ip02-buyer.firebaseapp.com",
  projectId: "p2-ip02-buyer",
  storageBucket: "p2-ip02-buyer.firebasestorage.app",
  messagingSenderId: "597761908959",
  appId: "1:597761908959:web:f7aa1dd9c19f73ffe6896a",
  measurementId: "G-923Z0EPJQV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
