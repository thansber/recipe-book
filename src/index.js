import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBnX8uADJIW1AwpM7hLrd_7SgcPtXdVA8U",
  authDomain: "recipe-book-1b19a.firebaseapp.com",
  databaseURL: "https://recipe-book-1b19a.firebaseio.com",
  projectId: "recipe-book-1b19a",
  storageBucket: "recipe-book-1b19a.appspot.com",
  messagingSenderId: "756859611210",
  appId: "1:756859611210:web:912cd5866f8cfd55eadeb3"
};

firebase.initializeApp(firebaseConfig);

import './recipe-auth.element.js';
