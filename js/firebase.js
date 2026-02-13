/**
 * Firebase init (Modular SDK)
 * IMPORTANT: Replace firebaseConfig with your own from Firebase Console.
 */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

export const firebaseConfig = {
  apiKey: "AIzaSyCTjwVwYIaRwWvWL_oGIaa7ugzd7h2hxDQ",
  authDomain: "digital-e-gram-panchayat-bcc22.firebaseapp.com",
  projectId: "digital-e-gram-panchayat-bcc22",
  storageBucket: "digital-e-gram-panchayat-bcc22.firebasestorage.app",
  messagingSenderId: "486963930394",
  appId: "1:486963930394:web:54c679fb1794ed08dc78a3",
  measurementId: "G-TC13K3FL13"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
