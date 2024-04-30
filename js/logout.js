import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { showMessage } from "./showMessage.js";

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
const logout = document.querySelector('#logout')
const auth = getAuth();

logout.addEventListener('click', async () => {
    await signOut(auth);
    showMessage("Cerrando sesión...", "success");

    window.setTimeout(function(){
        window.location.href ="index.html";
    }, 2000);

})