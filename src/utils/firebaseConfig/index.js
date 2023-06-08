import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore/lite';

function StartFirebase() {
    const firebaseConfig = {
        apiKey: "AIzaSyCIAEnwvzVgXDegIG7sDBVyKrYj1Q9z90s",
        authDomain: "spyfallreloaded.firebaseapp.com",
        databaseURL: "https://spyfallreloaded-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "spyfallreloaded",
        storageBucket: "spyfallreloaded.appspot.com",
        messagingSenderId: "389993260083",
        appId: "1:389993260083:web:68a43253f0fbbaf3e4af46",
        measurementId: "G-8V103VENEC"
    };

    const app = initializeApp(firebaseConfig);

    return getDatabase(app)
}

export default StartFirebase;