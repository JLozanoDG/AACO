import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, getDocs, orderBy, query } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { showMessage } from "./showMessage.js";
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
const auth = getAuth();
const loginform = document.querySelector('#login-form');
const loginbutton = document.querySelector("#searchbarbutton");
const loginbuttoncontainer = document.querySelector("#sb-buttoncontainer");
const loginphone = document.querySelector("#navbarbutton");
const loginphonecontainer = document.querySelector("#nb-buttoncontainer");
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const contentbutton = document.querySelector("#contentbutton");
const contentbuttonphone = document.querySelector("#contentbuttonphone");
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
const publications = collection(db, 'publications');
const publicationsList = document.querySelector('#publications-list');
const publicationSorter = query(publications, orderBy("date"));

const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];


onAuthStateChanged(auth, (user) => {
    if(user){
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
        
        loginbutton.addEventListener('click', async () => {
            await signOut(auth);
            showMessage("Cerrando sesión...", "success");
        
            window.setTimeout(function(){
                window.location.href ="index.html";
            }, 500);
        
        })
        
        loginphone.addEventListener('click', async () => {
            await signOut(auth);
            showMessage("Cerrando sesión...", "success");
        
            window.setTimeout(function(){
                window.location.href ="index.html";
            }, 500);
        
        })

    } else {

        loginform.addEventListener('submit', async e => {
    
            e.preventDefault()
        
            const email = loginform['login-email'].value;
            const password = loginform['login-password'].value;
        
            try {
                const credentials = await signInWithEmailAndPassword(auth, email, password);
                showMessage("Iniciando sesión...", "success");
        
                const modal = bootstrap.Modal.getInstance(document.querySelector('#loginnavbar'));
                modal.hide();
                
                window.setTimeout(function(){
                    window.location.href ="users.html";
                }, 1000);
        
        
            } catch (error) {
                console.log(error);
        
                if(error === "auth/too-many-requests"){
                    showMessage("Demasiados intentos fallidos, cuenta bloqueada temporalmente, intente nuevamente más tarde");
                }
                showMessage("credenciales invalidas, intente nuevamente");
        
            }
        })

    }
})

getDocs(publicationSorter)
    .then((snapshot) => {
        let publications = []
        snapshot.docs.forEach((publication) => {
            publications.push({ ...publication.data(), id: publication.id })
        });

        const reversed = publications.reverse();

        for (let i = 0; i < publications.length; i++) {
            renderPublications(publications[i])
        }

    })




let divcount = 0;

function renderPublications(publication) {

    //elementos para el contenedor de la publicación
    let firstdiv = document.createElement('div');
    let publicationcontainer = document.createElement('div');
    let publicationcontent = document.createElement('div');
    let publicationtitle = document.createElement('h3');
    let publicationautors = document.createElement('h6');
    let publicationtags = document.createElement('p');
    let publicationbutton = document.createElement('button');

    //añadir clase a firstdiv
    firstdiv.classList.add("col-12");

    //añadir clases a publicationcontainer y colocarlo en el firstdiv
    publicationcontainer.classList.add("round-news");
    publicationcontainer.classList.add("white-box");
    publicationcontainer.classList.add("box-shadow");
    publicationcontainer.classList.add("d-flex");
    publicationcontainer.classList.add("col-12");
    publicationcontainer.classList.add("justify-content-center");
    publicationcontainer.classList.add("mt-4");
    firstdiv.appendChild(publicationcontainer);

    //añadir clases a publicationcontent y colocarlo en publicationcontainer
    publicationcontent.classList.add("w-75");
    publicationcontent.classList.add("my-auto");
    publicationcontainer.appendChild(publicationcontent);

    //añadir clases a publicationtitle y colocarlo en publicationcontent
    publicationtitle.classList.add("black-text");
    publicationtitle.classList.add("text-start");
    publicationtitle.classList.add("publication-title");
    publicationcontent.appendChild(publicationtitle);

    //añadir clases a publicationautors y colocarlo en publicationcontent
    publicationautors.classList.add("green-text");
    publicationautors.classList.add("text-start");
    publicationautors.classList.add("publication-autors");
    publicationcontent.appendChild(publicationautors);

    //añadir clases a publicationtags y colocarlo en publicationcontent
    publicationtags.classList.add("round-box-p");
    publicationtags.classList.add("black-text");
    publicationtags.classList.add("publication-tags");
    publicationcontent.appendChild(publicationtags);

    //añadir clases a publicationnitton y colocarlo en publicationcontent
    publicationbutton.classList.add("green-button");
    publicationbutton.classList.add("button");
    publicationcontent.appendChild(publicationbutton);
    publicationbutton.setAttribute("data-bs-toggle", "modal");
    publicationbutton.setAttribute("type", "button");

    //añadir firstdiv a publicationslist
    publicationsList.appendChild(firstdiv);


    //conseguir info de firestore
    publicationtitle.textContent = publication.title;
    publicationautors.textContent = "Por: ";
    publicationtags.textContent = `Temas: `;
    publicationbutton.textContent = "Ver más";

    for (let i = 0; i < publication.author.length; i++) {

        if (i == publication.author.length - 1) {
            publicationautors.textContent = publicationautors.textContent + publication.author[i] + ".";
        } else {
            publicationautors.textContent = publicationautors.textContent + publication.author[i] + " , ";
        }
    }

    for (let i = 0; i < publication.tags.length; i++) {
        if (i == publication.tags.length - 1) {
            publicationtags.textContent = publicationtags.textContent + publication.tags[i] + ".";
        } else {
            publicationtags.textContent = publicationtags.textContent + publication.tags[i] + " , ";
        }
    }
    //Crear el modal que contendra la publicación
    let modalfade = document.createElement('div');
    let modaldialog = document.createElement('div');
    let modalcontent = document.createElement('div');
    let modalheader = document.createElement('div');
    let modaltitle = document.createElement("h5");
    let modalbody = document.createElement("div");
    let modalfooter = document.createElement("div");
    let exitbutton = document.createElement("button");
    let infotitle = document.createElement("h2");
    let infoautors = document.createElement("h5");
    let infomargin = document.createElement("div");
    let infodiv = document.createElement("div");
    let infoelements = document.createElement("div");
    let infolanguagecontainer = document.createElement("div");
    let infolanguagetitle = document.createElement("dt");
    let infolanguage = document.createElement("dd");
    let infodatecontainer = document.createElement("div");
    let infodatetitle = document.createElement("dt");
    let infodate = document.createElement("dd");
    let infotypecontainer = document.createElement("div");
    let infotypetitle = document.createElement("dt");
    let infotype = document.createElement("dd");
    let infocontainer = document.createElement("div");
    let inforowcontainer = document.createElement("div");
    let infolinksmargin = document.createElement("div");
    let infoabstractcontainer = document.createElement("div");
    let infoabstracttitle = document.createElement("h5");
    let infoabstract = document.createElement("p");
    let infolinkscontainer = document.createElement("div");
    let infolinksbutton = document.createElement("a");

    //create id for modal
    modalfade.id = `news${divcount}`;
    publicationbutton.setAttribute("data-bs-target", `#${modalfade.id}`);

    //se añaden clases al contenedor del modal de la noticia
    modalfade.classList.add("modal");
    modalfade.classList.add("fade");
    modalfade.setAttribute("tabindex", "-1");
    modalfade.setAttribute("data-bs-keyboard", "false");
    modalfade.setAttribute("aria-labelledby", modalfade.id);
    modalfade.setAttribute("aria-hidden", "true");

    //se añaden clases de modaldialog y se coloca dentro de modalfade
    modaldialog.classList.add("modal-dialog");
    modaldialog.classList.add("modal-xl");
    modaldialog.classList.add("modal-dialog-scrollable");
    modaldialog.classList.add("modal-dialog-centered");
    modaldialog.setAttribute("role", "document");
    modalfade.appendChild(modaldialog);

    //se añaden clases de modalcontent y se coloca dentro de modaldialog
    modalcontent.classList.add("modal-content");
    modaldialog.appendChild(modalcontent);

    //se añaden clases de modalheader y se coloca dentro de modalcontent
    modalheader.classList.add("modal-header");
    modalcontent.appendChild(modalheader);

    //se añaden clases de modaltitle y se coloca dentro de modalheader
    modaltitle.classList.add("modal-title");
    modaltitle.id = `newstitle${divcount}`
    modalheader.appendChild(modaltitle);
    modaltitle.textContent = "Publicación";

    //se añaden clases de exitbutton y se coloca dentro de modalheader
    exitbutton.classList.add("btn-close");
    exitbutton.setAttribute("type", "button");
    exitbutton.setAttribute("data-bs-dismiss", "modal");
    exitbutton.setAttribute("aria-label", "Close");
    modalheader.appendChild(exitbutton);

    //se añaden clases de modalbody y se coloca dentro de modalcontent
    modalbody.classList.add("modal-body");
    modalcontent.appendChild(modalbody);

    //se añaden clases de modalfooter y se coloca dentro de modalcontent
    modalfooter.classList.add("modal-footer");
    modalcontent.appendChild(modalfooter);

    //se añade el modal a la news list
    publicationsList.appendChild(modalfade);


    //se añaden clases de infomargin y se coloca dentro de modalbody
    infomargin.classList.add("info-margin");
    infomargin.classList.add("mx-auto");
    infomargin.classList.add("align-items-center");
    infomargin.classList.add("d-flex");
    infomargin.classList.add("row");
    infomargin.classList.add("my-4");
    modalbody.appendChild(infomargin);

    //se añaden clases de infotitle y se coloca dentro de infomargin
    infotitle.classList.add("black-text");
    infotitle.style.fontWeight = "var(--f-bold)";
    infotitle.classList.add("display-6");
    infotitle.classList.add("text-center");
    infotitle.classList.add("pb-2");
    infotitle.classList.add("col-12");
    infotitle.textContent = publication.title;
    infomargin.appendChild(infotitle);

    infoautors.classList.add("green-text");
    infoautors.style.fontWeight = "var(--f-medium)";
    infoautors.classList.add("text-center");
    infoautors.classList.add("pb-4");
    infoautors.classList.add("col-12");
    infoautors.classList.add("divisor-bottom");
    infoautors.textContent = publicationautors.textContent;
    infomargin.appendChild(infoautors);

    //se añaden clases de infodiv y se coloca dentro de infomargin
    infodiv.classList.add("col-12");
    infodiv.classList.add("d-flex");
    infodiv.classList.add("align-items-center");
    infomargin.appendChild(infodiv);

    //se añaden clases de infoelements y se coloca dentro de infomargin
    infoelements.classList.add("row");
    infoelements.classList.add("w-100");
    infoelements.classList.add("mx-auto");
    infoelements.classList.add("align-items-center");
    infoelements.classList.add("align-items-center");
    infoelements.classList.add("green-box");
    infoelements.classList.add("round-border");
    infoelements.classList.add("mt-2");
    infodiv.appendChild(infoelements);

    //se añaden clases de infolanguagetitle y se coloca dentro de infoelements
    infolanguagecontainer.classList.add("col-lg-4");
    infolanguagecontainer.classList.add("col-12");
    infolanguagecontainer.classList.add("text-center");
    infolanguagecontainer.classList.add("justify-center");
    infolanguagecontainer.classList.add("white-text");
    infoelements.appendChild(infolanguagecontainer);

    //se añaden clases de infolanguagetitle y se coloca dentro de infomargin
    infolanguagetitle.classList.add("fw-bold");
    infolanguagetitle.textContent = "Idioma"
    infolanguagecontainer.appendChild(infolanguagetitle);
    infolanguagetitle.classList.add("mt-2");

    //se añade contendido de infolanguage
    infolanguage.textContent = publication.lang;
    infolanguagecontainer.appendChild(infolanguage);

    //se añaden clases de infodatecontainer y se coloca dentro de infoelements
    infodatecontainer.classList.add("col-lg-4");
    infodatecontainer.classList.add("col-12");
    infodatecontainer.classList.add("text-center");
    infodatecontainer.classList.add("justify-center");
    infodatecontainer.classList.add("white-text");
    infoelements.appendChild(infodatecontainer);

    //se añaden clases de infolanguagetitle y se coloca dentro de infomargin
    infodatetitle.classList.add("fw-bold");
    infodatetitle.textContent = "Fecha de publicación"
    infodatecontainer.appendChild(infodatetitle);
    infodatetitle.classList.add("mt-2");

    //se añade contenido de infodate
    var utcSeconds = publication.date.seconds;
    var day = new Date(utcSeconds * 1000);
    infodate.textContent = meses[day.getMonth()] + " " + day.getFullYear();
    infodatecontainer.appendChild(infodate);

    //se añaden clases de infodatecontainer y se coloca dentro de infoelements
    infotypecontainer.classList.add("col-lg-4");
    infotypecontainer.classList.add("col-12");
    infotypecontainer.classList.add("text-center");
    infotypecontainer.classList.add("justify-center");
    infotypecontainer.classList.add("white-text");
    infoelements.appendChild(infotypecontainer);

    //se añaden clases de infolanguagetitle y se coloca dentro de infomargin
    infotypetitle.classList.add("fw-bold");
    infotypetitle.textContent = "Tipo de publicación"
    infotypecontainer.appendChild(infotypetitle);
    infotypetitle.classList.add("mt-2");

    //se añade contenido de infoype
    infotype.textContent = publication.type;
    infotypecontainer.appendChild(infotype);

    infocontainer.classList.add("col-12");
    infocontainer.classList.add("d-flex");
    infocontainer.classList.add("align-items-center");
    infomargin.appendChild(infocontainer);

    inforowcontainer.classList.add("row");
    inforowcontainer.classList.add("w-100");
    infocontainer.appendChild(inforowcontainer);

    //se añaden clases de infoabstractcontainer y se coloca dentro de infomargin 
    infoabstractcontainer.classList.add("col-12");
    infoabstractcontainer.classList.add("col-lg-8");
    infoabstractcontainer.classList.add("mt-4");
    inforowcontainer.appendChild(infoabstractcontainer);

    //se añaden clases de infoabstracttitle y se coloca dentro de infoabstractcontainer
    infoabstracttitle.classList.add("text-start");
    infoabstracttitle.classList.add("fw-bold");
    infoabstracttitle.textContent = "Resumen";
    infoabstractcontainer.appendChild(infoabstracttitle);

    //se añaden clases de infoabstract y se coloca dentro de infoabstractcontainer
    infoabstract.textContent = publication.sumarry;
    infoabstractcontainer.appendChild(infoabstract);

    infolinkscontainer.classList.add("col-12");
    infolinkscontainer.classList.add("col-lg-4");
    infolinkscontainer.classList.add("mt-4");
    inforowcontainer.appendChild(infolinkscontainer);

    infolinksmargin.classList.add("white-box");
    infolinksmargin.classList.add("round-corners");
    infolinksmargin.classList.add("p-4");
    infolinksmargin.classList.add("d-flex");
    infolinksmargin.classList.add("align-items-center");
    infolinkscontainer.appendChild(infolinksmargin);

    infolinksbutton.classList.add("button");
    infolinksbutton.classList.add("green-button");
    infolinksbutton.classList.add("mx-auto");
    infolinksmargin.appendChild(infolinksbutton);
    infolinksbutton.textContent = "Ver en Hermes";
    infolinksbutton.href = `${publication.link}`;
    infolinksbutton.setAttribute('target', '_blank');

    divcount++;

}
