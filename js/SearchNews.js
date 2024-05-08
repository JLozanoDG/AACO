document.addEventListener('keyup', e => {
    
    if(e.target.matches("#newssearchinput")){

        if (e.key === "Escape")e.target.value ="";

        document.querySelectorAll(".news").forEach(news => {

            const newstitle = news.querySelector(".news-title").textContent;
            const newsdescription = news.querySelector(".news-description").textContent;

            newstitle.toLowerCase().includes(e.target.value.toLowerCase())
            ?news.classList.remove("filtro")
            :news.classList.add("filtro");

            /*newsdescription.toLowerCase().includes(e.target.value.toLowerCase())
            ?news.classList.remove("filtro")
            :news.classList.add("filtro");*/
        });

    }
})