// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDFPpjhh4AFmmOOZoANbyEI97vCINsK-d0",
    authDomain: "my-chat-87035.firebaseapp.com",
    projectId: "my-chat-87035",
    storageBucket: "my-chat-87035.appspot.com",
    messagingSenderId: "748156149849",
    appId: "1:748156149849:web:360b8ab25930b3b82d1148"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
