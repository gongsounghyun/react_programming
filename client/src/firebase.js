import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAQ853elot_JaCuvHL-z5Q9bdtSbsS5ajg",
    authDomain: "healthsns.firebaseapp.com",
    projectId: "healthsns",
    storageBucket: "healthsns.appspot.com",
    messagingSenderId: "833400888747",
    appId: "1:833400888747:web:db76d6f3a2292cecebc6ee",
    measurementId: "G-Y65ZDEL9Z4"
};

firebase.initializeApp(firebaseConfig);
const firestore = new firebase.firestore();
const storage = firebase.storage();

export {firestore, storage, firebase};
