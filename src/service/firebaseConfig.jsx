// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA0TiiE5CF_T8hg4GYbS5MdoUqtVpasA7w",
    authDomain: "ai-trip-planner-999.firebaseapp.com",
    projectId: "ai-trip-planner-999",
    storageBucket: "ai-trip-planner-999.firebasestorage.app",
    messagingSenderId: "117207840616",
    appId: "1:117207840616:web:f1dd5f6527ea7c613688dd",
    measurementId: "G-XM55JQTXN4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);