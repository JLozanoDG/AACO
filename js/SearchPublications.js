document.addEventListener('keyup', e => {

    if (e.target.matches("#pubsearchinput")) {

        if (e.key === "Escape") e.target.value = "";

        document.querySelectorAll(".publications").forEach(publication => {

            const pubstitle = publication.querySelector(".publication-title").textContent;
            const pubtags = publication.querySelector(".publication-tags").textContent;
            const pubautors = publication.querySelector(".publication-autors").textContent;

            if (pubstitle.toLowerCase().includes(e.target.value.toLowerCase()) || pubtags.toLowerCase().includes(e.target.value.toLowerCase()) || pubautors.toLowerCase().includes(e.target.value.toLowerCase())) {
                publication.classList.remove("filtro");
            } else {
                publication.classList.add("filtro");
            }
        });

    }
})