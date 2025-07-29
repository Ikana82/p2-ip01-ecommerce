// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3BACL8Iqud1C23G3Vxher_OorQ76cvdI",
  authDomain: "p2-ip01-ika.firebaseapp.com",
  projectId: "p2-ip01-ika",
  storageBucket: "p2-ip01-ika.firebasestorage.app",
  messagingSenderId: "713122830059",
  appId: "1:713122830059:web:506c445ab19ea295fb50ae",
  measurementId: "G-GE0FVVPEST",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
