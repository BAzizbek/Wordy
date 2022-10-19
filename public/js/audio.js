const listenBtns = document.querySelectorAll("[id='myvoice']");
const texts = document.querySelectorAll("[id='speech']");
const synth = window.speechSynthesis;

listenBtns.forEach((btn, i) =>
    btn.addEventListener(
        'click',
        (e) => {
            e.preventDefault();
            const txt = texts[i].innerHTML;
            synth.speak(new SpeechSynthesisUtterance(txt));
        },
        { once: true }
    )
);
