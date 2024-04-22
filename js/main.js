import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js'
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
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
const analytics = getAnalytics(app);
const db = getFirestore(app);

const colNews = collection(db, 'news');
const newsList = document.querySelector('#news-list');

getDocs(colNews)
    .then((snapshot) => {
        let news = []
        snapshot.docs.forEach((doc) => {
            news.push({ ...doc.data(), id: doc.id })
        })

        news.forEach((newsarticle) => {
            renderNews(newsarticle)
        })
    })
    .catch(err =>{
        console.log(err.message)
    } )

function renderNews(newsarticle){
    let articlecontainer = document.createElement('li');
    let title = document.createElement('span');
    let description = document.createElement('span');

    articlecontainer.setAttribute('data.id', newsarticle.id);
    title.textContent = newsarticle.titulo;
    description.textContent = newsarticle.description;

    articlecontainer.appendChild(title);
    articlecontainer.appendChild(description);

    newsList.appendChild(articlecontainer);
    
}


