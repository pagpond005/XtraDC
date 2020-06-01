import Firebase from 'firebase';
let config = {
    apiKey: "AIzaSyBHj44lBaba7ffulZ7PirrNQxButewn9_E",
    authDomain: "extra-e10c8.firebaseapp.com",
    databaseURL: "https://extra-e10c8.firebaseio.com",
    projectId: "extra-e10c8",
    storageBucket: "extra-e10c8.appspot.com",
    messagingSenderId: "628450640629",
    //appId: "1:431321070097:web:4cf9af907da3e7d9158fb0"
};
let app = Firebase.initializeApp(config);
export const db = app.database();