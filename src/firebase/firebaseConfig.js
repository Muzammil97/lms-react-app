import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBd4cTnh-VM95x_a40zjlaPAc-W-MYjg_E",
  authDomain: "reactauth-26f2f.firebaseapp.com",
  projectId: "reactauth-26f2f",
  storageBucket: "reactauth-26f2f.firebasestorage.app",
  messagingSenderId: "905878316883",
  appId: "1:905878316883:web:48ae7a850c265c039ca3a6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider(); // Google Auth Provider
export default app;

