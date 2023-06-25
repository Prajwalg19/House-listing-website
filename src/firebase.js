// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCkHupI4kjcqzZK0UITp5pjaVdBvdhV4l0",
    authDomain: "mango-c3441.firebaseapp.com",
    projectId: "mango-c3441",
    storageBucket: "mango-c3441.appspot.com",
    messagingSenderId: "88152791243",
    appId: "1:88152791243:web:a930f41983e29dd08aa34e",
    measurementId: "G-7G1ZSWJJVG",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
