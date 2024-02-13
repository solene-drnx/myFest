// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCHxGHBLjZRjQQ4W0fpZNzmzMeTdi3oaMg",
    authDomain: "myfest-8a76a.firebaseapp.com",
    projectId: "myfest-8a76a",
    storageBucket: "myfest-8a76a.appspot.com",
    messagingSenderId: "228117812009",
    appId: "1:228117812009:web:13b2041156df2879a99d38",
    measurementId: "G-W8GWQL9RZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get a reference to the Auth service
const storage = getStorage(app); // Get a reference to the Storage service
const analytics = getAnalytics(app); // Get a reference to the Analytics service

export { app, auth, storage, analytics };
