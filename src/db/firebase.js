import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBAdhy_3yJzymigtqxgY5RSQ1k5-bg8A8o',
  authDomain: 'mytestapp-42d75.firebaseapp.com',
  projectId: 'mytestapp-42d75',
  storageBucket: 'mytestapp-42d75.appspot.com',
  messagingSenderId: '982941303563',
  appId: '1:982941303563:web:10e0f9b2bac4c55a7dd80e',
  measurementId: 'G-85PS2LH404',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
