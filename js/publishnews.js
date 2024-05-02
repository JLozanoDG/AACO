import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js";
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
const db = getFirestore(app);
const colNews = collection(db, 'news');
const colPublications = collection(db, 'publications');
const newsform = document.querySelector("#publish-news-form");
const publishform = document.querySelector("#publish-article-form");
const storage = getStorage();

newsform.addEventListener('submit', async e => {
    
    e.preventDefault()

    const title = newsform['news-title'].value;
    const description = newsform['news-description'].value;
    const text = newsform['news-text'].value;
    let splittext = text.split('\n\n');
    const imagefile = newsform['news-image'].files[0];
    const storageRef = ref(storage, title);
    const linkimage = "";
    const modal = bootstrap.Modal.getInstance(document.querySelector('#modalnews'));

    showMessage("Cargando...", "success");

    try{

        const uploadfile = await uploadBytes(storageRef, imagefile);

        const geturl = await getDownloadURL(storageRef);

        const newNews = await addDoc(colNews, {
          title: title,
          description: description,
          date: serverTimestamp(),
          news: splittext,
          image: geturl,
        });
        modal.hide();
        showMessage("Nueva noticia publicada", "success");

    } catch{
        showMessage("Ocurrio un problema, intente nuevamente");
    }
})


publishform.addEventListener('submit', async e => {
    e.preventDefault()

    const title = publishform['article-title'].value;
    const authors = publishform['article-authors'].value;
    const authorsarray = [];
    authorsarray.push(authors);
    const language = publishform['article-language'].value;
    const date = publishform['article-date'].value;
    const type = publishform['article-type'].value;
    const url = publishform['article-url'].value;
    const tags = publishform['article-tags'].value;
    const tagsarray = [];
    tagsarray.push(tags);
    const text = publishform['article-text'].value;
    const modal = bootstrap.Modal.getInstance(document.querySelector('#modalpublications'));

    showMessage("Cargando...", "success");

    try {

        const newArticle = await addDoc(colPublications, {
            title: title,
            author: authorsarray,
            lang: language,
            date: date,
            type: type,
            link: url,
            tags: tagsarray,
            sumarry: text,
        })

        modal.hide();
        showMessage("Nuevo articulo publicado", "success");

    } catch {
        showMessage("Ocurrio un problema, intente nuevamente");
    }



})