document.addEventListener('keyup', e => {

    if (e.target.matches("#pubsearchinput")) {

        if (e.key === "Escape") e.target.value = "";

        document.querySelectorAll(".publications").forEach(publication => {

            const pubstitle = publication.querySelector(".publication-title").textContent.normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2").normalize();
            const pubtags = publication.querySelector(".publication-tags").textContent.normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2").normalize();
            const pubautors = publication.querySelector(".publication-autors").textContent.normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2").normalize();

            if (pubstitle.toLowerCase().includes(e.target.value.toLowerCase()) || pubtags.toLowerCase().includes(e.target.value.toLowerCase()) || pubautors.toLowerCase().includes(e.target.value.toLowerCase())) {
                publication.classList.remove("filtro");
            } else {
                publication.classList.add("filtro");
            }
        });

    }
})