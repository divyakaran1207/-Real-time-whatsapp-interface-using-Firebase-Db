// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD-3rHWMZEbxgG_RK-d2BlQifryMxEmKgA",
  authDomain: "whatsapp-clone-19b78.firebaseapp.com",
  projectId: "whatsapp-clone-19b78",
  storageBucket: "whatsapp-clone-19b78.appspot.com",
  messagingSenderId: "576119127595",
  appId: "1:576119127595:web:d9f64fae9715a0afcbf46e",
  measurementId: "G-2YRD75J51K"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
// database
const db = firebaseApp.firestore();
// for firebase authenticatoin
const auth = firebase.auth();
// for google authentication
const provider = new firebase.auth.GoogleAuthProvider();

export {auth,provider};
export default db;