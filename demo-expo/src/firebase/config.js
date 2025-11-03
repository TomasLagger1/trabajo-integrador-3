import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCZcALTTxWMPaT0_PB7a8e_K9LPSyHWJ1A",
  authDomain: "mesi67.firebaseapp.com",
  projectId: "mesi67",
  storageBucket: "mesi67.firebasestorage.app",
  messagingSenderId: "656455708635",
  appId: "1:656455708635:web:967ebf634968d3d6e941fe"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage
export const db = app.firestore();
