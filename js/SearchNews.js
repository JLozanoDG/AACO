document.addEventListener('keyup', e => {
    
    if(e.target.matches("#newssearchinput")){

        if (e.key === "Escape")e.target.value ="";

        document.querySelectorAll(".news").forEach(news => {

            const newstitle = news.querySelector(".news-title").textContent.normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2").normalize();
            const newsdescription = news.querySelector(".news-description").textContent.normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2").normalize();

            if(newstitle.toLowerCase().includes(e.target.value.toLowerCase()) || newsdescription.toLowerCase().includes(e.target.value.toLowerCase())){
                news.classList.remove("filtro");
            }else {
                news.classList.add("filtro");
            }

            /*newsdescription.toLowerCase().includes(e.target.value.toLowerCase())
            ?news.classList.remove("filtro")
            :news.classList.add("filtro");*/
        });

    }
})