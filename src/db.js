// src/db.js
import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA760MgyJadkp7iqzifVAYhQy9rqsEZbTc",
  authDomain: "iteration-5-c10b8.firebaseapp.com",
  projectId: "iteration-5-c10b8",
  storageBucket: "iteration-5-c10b8.appspot.com",
  messagingSenderId: "309582966473",
  appId: "1:309582966473:web:d9f4045758604e23a06718",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Obtiene la instancia de Firestore
const db = getFirestore(app);

// Habilita persistencia offline
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === "failed-precondition") {
    console.warn("⚠️ Persistencia no disponible en múltiples pestañas");
  } else if (err.code === "unimplemented") {
    console.warn("⚠️ Persistencia no soportada por este navegador");
  }
});

// ✅ Exporta como default
export default db;
