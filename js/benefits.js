

const Slide1 = document.querySelector('#Slide1');
const Slide2 = document.querySelector('#Slide2');
const Slide3 = document.querySelector('#Slide3');
const Slide4 = document.querySelector('#Slide4');


function resize() {
    if( $(window).width() < 770 ){
        console.log("resized");
    }
}