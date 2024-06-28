import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';



const firebaseConfig = {
    apiKey: "AIzaSyB3S564rpa5yVsvOYE7SwQ_t3Tvdi2Ht1k",
    authDomain: "lamovidapp-58819.firebaseapp.com",
    projectId: "lamovidapp-58819",
    storageBucket: "lamovidapp-58819.appspot.com",
    messagingSenderId: "1073562781993",
    appId: "1:1073562781993:web:ff313990a761a5b0360f38",
    measurementId: "G-L71QT8Q00E"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);


export { app, auth, database };
