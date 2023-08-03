import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


const firebaseConfig = {
  apiKey: "AIzaSyAdfOnFDFoiknOGDyWsauqBguE4RGisPA8",
  authDomain: "mcity-e1a13.firebaseapp.com",
  projectId: "mcity-e1a13",
  storageBucket: "mcity-e1a13.appspot.com",
  messagingSenderId: "486323292432",
  appId: "1:486323292432:web:8d91362587d0f48b3b3d95",
  measurementId: "G-8YWCQLR5NY"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const DB = firebase.firestore();

const studentsCollection = DB.collection('students');
const membersCollection = DB.collection('members');
const projectsCollection = DB.collection('projects');

const promotionsCollection = DB.collection('promotions');



  export {
    firebase,
    studentsCollection,
    membersCollection,
    projectsCollection,
    promotionsCollection,
  }