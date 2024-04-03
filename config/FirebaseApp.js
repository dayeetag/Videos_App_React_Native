import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDGsdn0U7Uyo3j1lIzkiy-zg4-wQxgPRhE",
    authDomain: "reactnative-dd4cb.firebaseapp.com",
    projectId: "reactnative-dd4cb",
    storageBucket: "reactnative-dd4cb.appspot.com",
    messagingSenderId: "693907122788",
    appId: "1:693907122788:web:b91be1e021474de557cd71"
  };

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export {db}