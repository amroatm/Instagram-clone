
import firebase from "firebase"


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC0Bwbyc2wJbpkmY2dgRQLhP5EbT8VvYJ4",
    authDomain: "instagram-clone-72d50.firebaseapp.com",
    projectId: "instagram-clone-72d50",
    storageBucket: "instagram-clone-72d50.appspot.com",
    messagingSenderId: "929274701541",
    appId: "1:929274701541:web:7b830aacf3c6fa8332560c",
    measurementId: "G-JS4TSWG5WE"  
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export  { db, auth, storage } ;