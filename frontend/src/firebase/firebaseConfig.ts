import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBwghJUe-pcCq90STBhqo-sgpXwwEWgYSA",
    authDomain: "seoanalyzer-629e9.firebaseapp.com",
    projectId: "seoanalyzer-629e9",
    storageBucket: "seoanalyzer-629e9.firebasestorage.app",
    messagingSenderId: "584921803761",
    appId: "1:584921803761:web:52be37219c2d01392ef250",
    measurementId: "G-XJRTD32R18"
  };
  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);