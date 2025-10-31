// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAd3bhWoNuGO1CspxxA-dvJ3XlrimlfrZs",
  authDomain: "sas-app-b36e7.firebaseapp.com",
  projectId: "sas-app-b36e7",
  storageBucket: "sas-app-b36e7.firebasestorage.app",
  messagingSenderId: "267252748",
  appId: "1:267252748:web:3d8080c6d8767ef6bfea29",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
