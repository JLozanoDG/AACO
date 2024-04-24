import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCmUnyjSh2z2qTz2aCQ-NuA22C9QOGy0p4",
    authDomain: "aaco-d7340.firebaseapp.com",
    projectId: "aaco-d7340",
    storageBucket: "aaco-d7340.appspot.com",
    messagingSenderId: "658480347902",
    appId: "1:658480347902:web:8a9764445579dd7f0ec3af",
    measurementId: "G-MBDEFL6D79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const colNews = collection(db, 'news');

let newsdatesorter = []

getDocs(colNews)
    .then((snapshot) => {
        let news = []
        snapshot.docs.forEach((doc) => {
            news.push({ ...doc.data(), id: doc.id })
        })

        news.forEach((newsdate) => {
            var utcSeconds = newsdate.date.seconds;
            var day = new Date(utcSeconds * 1000);
            const date = day.getDate() + "/" + day.getMonth() + "/" + day.getFullYear();
            newsdatesorter.push(date);
        })
    })
    .catch(err => {
        console.log(err.message)
    })

console.log(newsdatesorter);

newsdatesorter.sort(function (a, b) {
    // Convert the date strings to Date objects
    let dateA = new Date(a);
    let dateB = new Date(b);

    // Subtract the dates to get a value that is either negative, positive, or zero
    return dateA - dateB;
});

console.log(newsdatesorter);
