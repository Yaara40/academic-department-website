import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAN2mwVL3PEOo0jKL_At0eTxEpBSlQoyoQ",
  authDomain: "frontend---tamar-and-yaara.firebaseapp.com",
  projectId: "frontend---tamar-and-yaara",
  storageBucket: "frontend---tamar-and-yaara.firebasestorage.app",
  messagingSenderId: "784013201770",
  appId: "1:784013201770:web:973dbe55970e26faf55513",
  measurementId: "G-BV8GB6S7NC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const firestore = getFirestore(app);
