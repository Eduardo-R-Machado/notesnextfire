import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyC5QA2xaEP2YExhp30tI_O7hOtzW4lRX88",
  authDomain: "notesnextjs.firebaseapp.com",
  projectId: "notesnextjs",
  storageBucket: "notesnextjs.appspot.com",
  messagingSenderId: "452452309012",
  appId: "1:452452309012:web:3a3a636f9eee3f0447af01"

};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else{
  firebase.app();
}

const database = firebase.database();

export {database, firebase}