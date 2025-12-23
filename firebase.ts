
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCNgMxETNPTxXjaYcCYQu90-MNHO3yeiqQ",
  authDomain: "ffture-9f338.firebaseapp.com",
  databaseURL: "https://ffture-9f338-default-rtdb.firebaseio.com",
  projectId: "ffture-9f338",
  storageBucket: "ffture-9f338.firebasestorage.app",
  messagingSenderId: "396909991620",
  appId: "1:396909991620:web:49369d2800b5d84c02db91",
  measurementId: "G-KR6TQB2WK5"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
