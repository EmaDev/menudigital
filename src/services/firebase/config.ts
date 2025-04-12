// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBAK2q6v0aHuXun1IID5VNzyHK6hheROUc",
  authDomain: "pimba-app.firebaseapp.com",
  projectId: "pimba-app",
  storageBucket: "pimba-app.appspot.com",
  messagingSenderId: "543325091680",
  appId: "1:543325091680:web:c6a0a79f1b205a89e31005",
  measurementId: "G-N78MXBHJT6"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);