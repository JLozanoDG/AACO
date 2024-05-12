import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
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
const auth = getAuth();
const loginform = document.querySelector('#login-form');
const loginbutton = document.querySelector("#searchbarbutton");
const loginbuttoncontainer = document.querySelector("#sb-buttoncontainer");
const loginphone = document.querySelector("#navbarbutton");
const loginphonecontainer = document.querySelector("#nb-buttoncontainer");
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const contentbutton = document.querySelector("#contentbutton");
const contentbuttonphone = document.querySelector("#contentbuttonphone");
const registerbutton = document.querySelector("#registeruserbtn");
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))


onAuthStateChanged(auth, (user) => {
    if (user) {
        loginbutton.classList.remove("fa-regular");
        loginbutton.classList.remove("fa-user");
        loginbutton.classList.add("fa-solid");
        loginbutton.classList.add("fa-right-from-bracket");
        loginbuttoncontainer.setAttribute("data-bs-toggle", "");
        loginphonecontainer.setAttribute("data-bs-toggle", "");

        loginphone.classList.remove("fa-regular");
        loginphone.classList.remove("fa-user");
        loginphone.classList.add("fa-solid");
        loginphone.classList.add("fa-right-from-bracket");

        contentbutton.classList.remove("d-none");
        contentbuttonphone.classList.remove("d-none");

        if(user.email == "admin@aaco.com"){
            registerbutton.classList.remove("d-none");
        }

        loginbutton.addEventListener('click', async () => {
            await signOut(auth);
            showMessage("Cerrando sesión...", "success");

            window.setTimeout(function () {
                window.location.href = "index.html";
            }, 500);

        })

        loginphone.addEventListener('click', async () => {
            await signOut(auth);
            const signOut = "cerrar sesion";
            logOut(signOut);

            showMessage("Cerrando sesión...", "success");
            window.setTimeout(function () {
                window.location.href = "index.html";
            }, 500);

        })

    } else {
        window.setTimeout(function () {
            window.location.href = "index.html";
        }, 500);
    }
})



