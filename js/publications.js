import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, getDocs, orderBy, query } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';
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

const publications = collection(db, 'publications');
const publicationsList = document.querySelector('#publications-list');
const publicationSorter = query(publications, orderBy("date"));

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
    publicationtags.textContent = "Temas: ";
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

    divcount++;

}
