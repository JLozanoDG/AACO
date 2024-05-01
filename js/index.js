import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, getDocs, orderBy, query } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
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

const colNews = collection(db, 'news');
const newsList = document.querySelector('#news-list');
const newssorter = query(colNews, orderBy("date"));
const loginform = document.querySelector('#login-form');
let divcount = 0;

onAuthStateChanged(auth, (user) => {
    if(user){
        window.location.href ="users.html";
    } else {

    }
})

getDocs(newssorter)
    .then((snapshot) => {
        let news = []
        snapshot.docs.forEach((doc) => {
            news.push({ ...doc.data(), id: doc.id })
        })

        const reversed = news.reverse();

        for (let i = 0; i < 4; i++) {
            renderNews(news[i])
        }

    })
    .catch(err => {
        console.log(err.message)
    });



loginform.addEventListener('submit', async e => {
    e.preventDefault()

    const email = loginform['login-email'].value;
    const password = loginform['login-password'].value;

    try {
        const credentials = await signInWithEmailAndPassword(auth, email, password);
        const modal = bootstrap.Modal.getInstance(document.querySelector('#loginnavbar'));
        modal.hide();
        showMessage("Iniciando sesión...", "success");

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


function renderNews(newsarticle) {
    let firstdiv = document.createElement('div');
    let articlecontainer = document.createElement('div');
    let title = document.createElement('h3');
    let description = document.createElement('p');
    let date = document.createElement('h5');
    let textcontainer = document.createElement('div');
    let seemorebutton = document.createElement('button');

    //Crear el modal que contendra la noticia
    let modalfade = document.createElement('div');
    let modaldialog = document.createElement('div');
    let modalcontent = document.createElement('div');
    let modalheader = document.createElement('div');
    let modaltitle = document.createElement("h5");
    let modalbody = document.createElement("div");
    let modalfooter = document.createElement("div");
    let exitbutton = document.createElement("button");
    let modalherocontainer = document.createElement("div");
    let modalherobg = document.createElement("div");
    let modalherocontent = document.createElement("div");
    let modalherotitle = document.createElement("h3");
    let modalherodate = document.createElement("h5");
    let modalnewscontainer = document.createElement("div");
    let modalnewsdescription = document.createElement("li");

    seemorebutton.setAttribute("data-bs-toggle", "modal");
    //definir ids de las noticias
    modalfade.id = `news${divcount}`;

    seemorebutton.setAttribute("data-bs-target", `#${modalfade.id}`);

    var utcSeconds = newsarticle.date.seconds;
    var day = new Date(utcSeconds * 1000);

    title.textContent = newsarticle.title;
    title.classList.add("fw-bold");
    title.classList.add("news-title");
    description.textContent = newsarticle.description;
    date.textContent = day.getDate() + " / " + day.getMonth() + " / " + day.getFullYear();
    seemorebutton.textContent = "Ver más";
    date.classList.add("fst-italic");
    date.classList.add("fs-6");
    date.style.fontWeight = "var(--f-medium)";
    date.classList.add("news-date");
    description.classList.add("news-description");

    //añadir el article container a firstdiv y agregar clases de firstdiv
    firstdiv.appendChild(articlecontainer);
    firstdiv.classList.add("col-lg-6");
    firstdiv.classList.add("mt-2");

    //añade el container y se agregan sus calses
    articlecontainer.classList.add("round-news");
    articlecontainer.classList.add("white-box");
    articlecontainer.classList.add("box-shadow");
    articlecontainer.classList.add("d-flex");
    articlecontainer.classList.add("justify-content-center");
    articlecontainer.classList.add("mt-4");

    //se añade el div que centra los textos y se agregan sus clases
    articlecontainer.appendChild(textcontainer);
    textcontainer.classList.add('w-75');
    textcontainer.classList.add('my-auto');

    //se añade el titulo principal y se agregan sus clases
    textcontainer.appendChild(title);
    title.classList.add('black-text');
    title.classList.add('text-start');

    //se añade la fecha de la noticia y se agregan sus clases
    textcontainer.appendChild(date);
    date.classList.add('green-text');
    date.classList.add('text-start');

    //se añade la descripción de la noticia
    textcontainer.appendChild(description);
    description.classList.add('round-box-p');
    description.classList.add('black-text');

    //se añade el botón de ver más
    textcontainer.appendChild(seemorebutton);
    seemorebutton.classList.add('button');
    seemorebutton.classList.add('green-button');
    seemorebutton.setAttribute("type", "button");

    //se añade el articlecontainer al newsList
    newsList.appendChild(firstdiv);

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

    //se añaden clases de exitbutton y se coloca dentro de modalheader
    exitbutton.classList.add("btn-close");
    exitbutton.setAttribute("type", "button");
    exitbutton.setAttribute("data-bs-dismiss", "modal");
    exitbutton.setAttribute("aria-label", "Close");
    modalheader.appendChild(exitbutton);

    //se añaden clases de modalbody y se coloca dentro de modalcontent
    modalbody.classList.add("modal-body");
    modalcontent.appendChild(modalbody);

    //se añaden clases de modalherocontainer y se coloca dentro del modalbody una imagen
    modalherocontainer.classList.add("w-100");
    modalherocontainer.classList.add("modalhero");
    modalherocontainer.style.backgroundImage = `url(${newsarticle.image})`;
    modalbody.appendChild(modalherocontainer);

    //se añaden clases de modalfooter y se coloca dentro de modalcontent
    modalfooter.classList.add("modal-footer");
    modalcontent.appendChild(modalfooter);

    //se añaden clases de modalherobg y se coloca dentro de modalcontent
    modalherobg.classList.add("modalherobg");
    modalherobg.classList.add("w-100");
    modalherobg.classList.add("h-100");
    modalherobg.classList.add("d-flex");
    modalherobg.classList.add("align-items-center");
    modalherobg.classList.add("justify-content-center");
    modalherocontainer.appendChild(modalherobg);

    //se añaden clases de modalherocontent y se coloca dentro de modalherobg
    modalherocontent.classList.add("w-75");
    modalherocontent.classList.add("mx-auto");
    modalherocontent.classList.add("my-auto");
    modalherobg.appendChild(modalherocontent);

    //se añaden clases de modalherotitle y se coloca dentro de modalherocontent
    modalherotitle.textContent = newsarticle.title;
    modalherotitle.classList.add("white-text");
    modalherotitle.classList.add("display-4");
    modalherocontent.appendChild(modalherotitle);
    modalherotitle.classList.add("text-center");
    modalherotitle.style.fontWeight = "var(--f-bold)";


    //se añaden clases de modalherodate y se coloca dentro de modalherocontent
    modalherodate.textContent = day.getDate() + " / " + day.getMonth() + " / " + day.getFullYear();
    modalherodate.classList.add("white-text");
    modalherodate.classList.add("text-center");
    modalherodate.classList.add("mt-2");
    modalherocontent.appendChild(modalherodate);
    modalherodate.style.fontSize = "18px";
    modalherodate.classList.add("fst-italic");


    //se añaden clases de modalnewscontainer y se coloca dentro de modalbody
    modalnewscontainer.classList.add("modalnewscontainer");
    modalnewscontainer.classList.add("mx-auto");
    modalnewscontainer.classList.add("p-4");
    modalbody.appendChild(modalnewscontainer);

    //se añaden clases de modalherodate y se coloca dentro de modalherocontent
    modalnewsdescription.classList.add("black-text");
    modalnewsdescription.classList.add("italic");
    modalnewsdescription.textContent = newsarticle.description;
    modalnewscontainer.appendChild(modalnewsdescription);

    //crear y colocar los newsparagraphs en el modalnewscontainer
    newsarticle.news.forEach((paragraph) => {
        let newsparagraph = document.createElement("p");
        newsparagraph.textContent = paragraph;
        newsparagraph.classList.add("mt-4");
        modalnewscontainer.appendChild(newsparagraph);
    })

    //se añade el modal a la news list
    newsList.appendChild(modalfade);

    //add info to modal
    modaltitle.textContent = "Noticia";

    divcount++;
}


