import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCl2v7Qvhn2wESePw0cQx_6hp7Ym0inkkI",
  authDomain: "instagram-8666b.firebaseapp.com",
  projectId: "instagram-8666b",
  storageBucket: "instagram-8666b.appspot.com",
  messagingSenderId: "454297395125",
  appId: "1:454297395125:web:939d9e7ad7097e28b5c3fc",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
