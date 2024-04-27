import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, orderBy, query } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';
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
const newsList = document.querySelector('#news-list');
const newssorter = query(colNews, orderBy("date"));

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
    })


function renderNews(news) {
    let firstdiv = document.createElement('div');
    let articlecontainer = document.createElement('div');
    let title = document.createElement('h3');
    let description = document.createElement('p');
    let date = document.createElement('h5');
    let textcontainer = document.createElement('div');
    let seemorebutton = document.createElement('a');
    seemorebutton.href = "";

    var utcSeconds = news.date.seconds;
    var day = new Date(utcSeconds * 1000);

    title.textContent = news.title;
    description.textContent = news.description;
    date.textContent = day.getDate() + " / " + day.getMonth() + " / " + day.getFullYear();
    seemorebutton.textContent = "Ver más";

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

    //se añade el articlecontainer al newsList
    newsList.appendChild(firstdiv);
}


