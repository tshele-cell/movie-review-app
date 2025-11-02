import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyC9kIrh7Z9wNUlrMTd39GzdWaZo3wv0yzc",
  authDomain: "movie-review-app-lebajoa.firebaseapp.com",
  projectId: "movie-review-app-lebajoa",
  storageBucket: "movie-review-app-lebajoa.firebasestorage.app",
  messagingSenderId: "57129566898",
  appId: "1:57129566898:web:46ff5b21df9786756dbfab"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
