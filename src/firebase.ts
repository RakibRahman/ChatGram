// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import 'firebase/firestore';
import { collection, getFirestore, serverTimestamp } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyDFPpjhh4AFmmOOZoANbyEI97vCINsK-d0',
    authDomain: 'my-chat-87035.firebaseapp.com',
    projectId: 'my-chat-87035',
    storageBucket: 'my-chat-87035.appspot.com',
    messagingSenderId: '748156149849',
    appId: '1:748156149849:web:360b8ab25930b3b82d1148',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const timeStamp = serverTimestamp();

export const accessCollection = (collectionName: string, secCollectionName?: string) =>
    collection(db, collectionName, secCollectionName ?? '');
