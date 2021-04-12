import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyA594Q3PxZ_7iYN6z0UIhqyIEOTnKGqvsk",
    authDomain: "react-firestore-crud-8a7d2.firebaseapp.com",
    databaseURL: "https://react-firestore-crud-8a7d2-default-rtdb.firebaseio.com",
    projectId: "react-firestore-crud-8a7d2",
    storageBucket: "react-firestore-crud-8a7d2.appspot.com",
    messagingSenderId: "938631300585",
    appId: "1:938631300585:web:14115a75b734deadedf778"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  const provider = new firebase.auth.GoogleAuthProvider();

  const authFirebase = firebase
  
export {storage,provider,authFirebase}
