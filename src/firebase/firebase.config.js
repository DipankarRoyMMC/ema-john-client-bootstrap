// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDk4A31Kw3_VFIu4QCpNBByd6mSspEl8Ng",
    authDomain: "ema-john-client-1f2d3.firebaseapp.com",
    projectId: "ema-john-client-1f2d3",
    storageBucket: "ema-john-client-1f2d3.appspot.com",
    messagingSenderId: "459114419501",
    appId: "1:459114419501:web:3b30c0a26f28c25a1fefa4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;