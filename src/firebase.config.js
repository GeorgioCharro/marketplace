// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9uC7UFqjTrxzTa9iJPj3KymC0kLGv-Zo",
  authDomain: "house-marketplace-app-5ae27.firebaseapp.com",
  projectId: "house-marketplace-app-5ae27",
  storageBucket: "house-marketplace-app-5ae27.appspot.com",
  messagingSenderId: "521776986085",
  appId: "1:521776986085:web:d1faa5cb56324e279be10c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db=getFirestore()