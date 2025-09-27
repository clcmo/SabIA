// firebase-config.js
const firebaseConfig = {
  apiKey: "AIzaSyCn6EAGA69qZ9UtCcscQlnmisZrqsd8S4c",
  authDomain: "sabia-projeto.firebaseapp.com",
  projectId: "sabia-projeto",
  storageBucket: "sabia-projeto.firebasestorage.app",
  messagingSenderId: "691211526085",
  appId: "1:691211526085:web:0528a27154a61919ae75ac",
  measurementId: "G-C1NGSBG74F"
};


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); // ou firebase.database()
