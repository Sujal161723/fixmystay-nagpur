// Pehle Firebase modules import karo (agar upar nahi hain toh)
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Tumhara firebaseConfig yahan pehle se hoga...
const firebaseConfig = {
  apiKey: "AIzaSyB6NsMuu4tMwwvnuRg1Nj3YcM8q3DtE0_Q",
  authDomain: "fixmystay-ngp.firebaseapp.com",
  projectId: "fixmystay-ngp",
  storageBucket: "fixmystay-ngp.firebasestorage.app",
  messagingSenderId: "895631994164",
  appId: "1:895631994164:web:25a153017d44f41f238961",
  measurementId: "G-P23VC1HR48"
};

// Initialize Firebase (Ye wala part missing ho sakta hai)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// SABSE ZAROORI: Inhe export karna taaki baaki files use kar saken
export { app, db, auth, storage };