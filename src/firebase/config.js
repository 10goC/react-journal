// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASomR1b8OawzWCbvC96qh9W0bCO4c-bnE",
  authDomain: "react-curso-83d2a.firebaseapp.com",
  projectId: "react-curso-83d2a",
  storageBucket: "react-curso-83d2a.appspot.com",
  messagingSenderId: "923967721995",
  appId: "1:923967721995:web:19bc46da6680a8a417ed0e"
};

// Initialize Firebase
export const FirebaseApp = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );