import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyBO_PHxC7xq7UoLp0ptXoje22JdhCkGp4w",
    authDomain: "todo-rrf-316-d0eb8.firebaseapp.com",
    databaseURL: "https://todo-rrf-316-d0eb8.firebaseio.com",
    projectId: "todo-rrf-316-d0eb8",
    storageBucket: "todo-rrf-316-d0eb8.appspot.com",
    messagingSenderId: "917056197418",
    appId: "1:917056197418:web:221471737973b0d892c453",
    measurementId: "G-P4H1VN7G3B"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;