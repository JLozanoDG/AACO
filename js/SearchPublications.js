document.addEventListener('keyup', e => {
    
    if(e.target.matches("#pubsearchinput")){

        if (e.key === "Escape")e.target.value ="";

        document.querySelectorAll(".publications").forEach(publication => {

            const pubstitle = publication.querySelector(".publication-title").textContent;

            pubstitle.toLowerCase().includes(e.target.value.toLowerCase())
            ?publication.classList.remove("filtro")
            :publication.classList.add("filtro");

            /* newsdescription.toLowerCase().includes(e.target.value.toLowerCase())
            ?news.classList.remove("filtro")
            :news.classList.add("filtro"); */
        });

    }
})