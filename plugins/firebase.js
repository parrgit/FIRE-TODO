import firebase from "firebase";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCHmLwHQ1KwJSRiiWYrXRIkfWgFBfZjjx0",
    authDomain: "nuxt-todo-list-firebase.firebaseapp.com",
    projectId: "nuxt-todo-list-firebase",
    storageBucket: "nuxt-todo-list-firebase.appspot.com",
    messagingSenderId: "1014267242652",
    appId: "1:1014267242652:web:b14d390a1308385c7ca559",
    measurementId: "G-X7N14BN9HQ"
  });
}

export default firebase;
