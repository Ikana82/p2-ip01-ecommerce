// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//11-19 dimasukkan ke .env supaya jadi key secret code
const firebaseConfig = {
  apiKey: "AIzaSyDahU3b7pgNVMpvDijrJAE6LuPKQ4YEvPg",
  authDomain: "fern-gc02-ika.firebaseapp.com",
  projectId: "fern-gc02-ika",
  storageBucket: "fern-gc02-ika.firebasestorage.app",
  messagingSenderId: "622282494743",
  appId: "1:622282494743:web:e2bb3d19e8070a3ba31d52",
  measurementId: "G-N40QSD083F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
