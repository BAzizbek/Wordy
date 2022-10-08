const listenBtns = document.querySelectorAll("[id='myvoice']");
const synth = window.speechSynthesis;

listenBtns.forEach((btn) =>
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(btn.value);
        const msg = new SpeechSynthesisUtterance(btn.value);
        synth.speak(msg);
        console.log(msg);
    })
);
