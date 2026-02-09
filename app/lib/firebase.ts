import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Auth import kiya

const firebaseConfig = {
  apiKey: "AIzaSyB6NsMuu4tMwwvnuRg1Nj3YcM8q3DtEO_Q",
  authDomain: "fixmystay-ngp.firebaseapp.com",
  projectId: "fixmystay-ngp",
  storageBucket: "fixmystay-ngp.firebasestorage.app",
  messagingSenderId: "895631994164",
  appId: "1:895631994164:web:25a153817d44f41f238961",
  measurementId: "G-P23VC1HR48"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // Auth initialize kiya

// Dono ko export kar rahe hain taaki har jagah use ho sakein
export { db, auth };