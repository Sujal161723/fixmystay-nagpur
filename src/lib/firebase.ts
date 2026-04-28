// Firebase modules import
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Debug: Log the API key to check if environment variables are loading correctly
// This will help us see if NEXT_PUBLIC_FIREBASE_API_KEY is being read properly
console.log("=== Firebase Configuration Debug ===");
console.log("NEXT_PUBLIC_FIREBASE_API_KEY:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? "Present (length: " + process.env.NEXT_PUBLIC_FIREBASE_API_KEY.length + ")" : "undefined");
console.log("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:", process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN);
console.log("NEXT_PUBLIC_FIREBASE_PROJECT_ID:", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
console.log("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:", process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);
console.log("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:", process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID);
console.log("NEXT_PUBLIC_FIREBASE_APP_ID:", process.env.NEXT_PUBLIC_FIREBASE_APP_ID);
console.log("====================================");

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Validate required configuration
const requiredKeys = ['apiKey', 'authDomain', 'projectId'];
const missingKeys = requiredKeys.filter(key => !firebaseConfig[key]);
if (missingKeys.length > 0) {
  console.error("ERROR: Missing required Firebase configuration keys:", missingKeys);
  console.error("Please check your .env.local file and ensure all NEXT_PUBLIC_FIREBASE_* variables are set correctly.");
}

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Export Firebase services
export { app, db, auth, storage };