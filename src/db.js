// src/db.js
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA760MgyJadkp7iqzifVAYhQy9rqsEZbTc",
  authDomain: "iteration-5-c10b8.firebaseapp.com",
  projectId: "iteration-5-c10b8",
  storageBucket: "iteration-5-c10b8.firebasestorage.app",
  messagingSenderId: "309582966473",
  appId: "1:309582966473:web:d9f4045758604e23a06718"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);