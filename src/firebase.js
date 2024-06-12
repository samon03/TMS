import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2sNhTL1jww3B5nhsELIR0cNwWUEryk-w",
  authDomain: "tms-react-135ad.firebaseapp.com",
  projectId: "tms-react-135ad",
  storageBucket: "tms-react-135ad.appspot.com",
  messagingSenderId: "541961275551",
  appId: "1:541961275551:web:eda8cf4a71f9908bb43aaa",
  measurementId: "G-QCZQE4103L"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
