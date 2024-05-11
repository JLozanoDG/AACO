

const Slide1 = document.querySelector('#Slide1');
const Slide2 = document.querySelector('#Slide2');
const Slide3 = document.querySelector('#Slide3');
const Slide4 = document.querySelector('#Slide4');


function resize() {
    if( $(window).width() < 770 ){
        console.log("resized");
    }
}

const form = document.querySelector("#contactform");

form.addEventListener('submit', handleSubmit)

async function handleSubmit(event) {
    showMessage("Enviando mensaje...", "success")
    event.preventDefault()
    const formData = new FormData(form);
    const response = await fetch(form.action,{
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })

    if(response.ok){
        showMessage("Mensaje enviado correctamente", "success")
        form.reset()
    } else {
        showMessage("Error: Mensaje no enviado, intente nuevamente")
    }
}