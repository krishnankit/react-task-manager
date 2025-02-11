import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.VITE_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const usersRef = collection(db, "users");
const tasksRef = collection(db, "tasks");

export {
  auth,
  usersRef,
  tasksRef,
}
