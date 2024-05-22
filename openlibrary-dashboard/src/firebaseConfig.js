// src/firebaseConfig.js
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyBoimAGZ2cKrIKx3i1Q6Tr244u95KaTDmo",
    authDomain: "book-dashboard-b5888.firebaseapp.com",
    projectId: "book-dashboard-b5888",
    storageBucket: "book-dashboard-b5888.appspot.com",
    messagingSenderId: "721391514990",
    appId: "1:721391514990:web:75d155da64b66ec3f7fd7f",
    measurementId: "G-VD3R6F3NL7"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth,db };
