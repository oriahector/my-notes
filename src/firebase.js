// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  signOut,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  onSnapshot,
  orderBy,
  doc,
  collection,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-librariess

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FB_API_KEY,
  authDomain: "mynotes-e2b62.firebaseapp.com",
  projectId: "mynotes-e2b62",
  storageBucket: "mynotes-e2b62.appspot.com",
  messagingSenderId: "156029464846",
  appId: "1:156029464846:web:1ca041fbdea6d55d5a275f",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const authInstance = getAuth(firebaseApp);
const db = getFirestore();

export {
  firebaseApp,
  authInstance,
  signOut,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  db,
  updateDoc,
  doc,
  deleteDoc,
  collection,
  setDoc,
  orderBy,
  onSnapshot,
};
