// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCqUeuiDt3r2vAjmQdjdNQIvUesrJCEJPQ",
    authDomain: "to-do-204a6.firebaseapp.com",
    projectId: "to-do-204a6",
    storageBucket: "to-do-204a6.firebasestorage.app",
    messagingSenderId: "189767842324",
    appId: "1:189767842324:web:a8510e4ed2b66b84ac4501",
    measurementId: "G-F01P2B6KYY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);