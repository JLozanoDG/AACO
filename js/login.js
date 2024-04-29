import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCmUnyjSh2z2qTz2aCQ-NuA22C9QOGy0p4",
    authDomain: "aaco-d7340.firebaseapp.com",
    projectId: "aaco-d7340",
    storageBucket: "aaco-d7340.appspot.com",
    messagingSenderId: "658480347902",
    appId: "1:658480347902:web:8a9764445579dd7f0ec3af",
    measurementId: "G-MBDEFL6D79"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const loginform = document.querySelector('#login-form');

loginform.addEventListener('submit', async e => {
    e.preventDefault()

    const email = loginform['login-email'].value;
    const password = loginform['login-password'].value;

    try {
        const credentials = await signInWithEmailAndPassword(auth, email, password);
        console.log(credentials);
    } catch (error) {
        console.log(error);
    }
})

