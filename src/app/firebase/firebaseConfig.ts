// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCskOMmHbr62j6h6f_JyW8cjrgPv3W__eM",
  authDomain: "ripple-855bb.firebaseapp.com",
  projectId: "ripple-855bb",
  storageBucket: "ripple-855bb.firebasestorage.app",
  messagingSenderId: "54829430339",
  appId: "1:54829430339:web:f74afc803354dd760246f6",
  measurementId: "G-5VG3172DV5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
