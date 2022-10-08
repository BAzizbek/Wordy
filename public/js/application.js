const searchBtn = document.querySelector('#searchBtn');
const wordInput = document.querySelector('#wordInput');
const select = document.querySelector('#select');

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    return fetch('/', {
        method: 'POST',
        headers: {
            'Content-type': 'Application/json',
        },
        body: JSON.stringify({
            type: select.value,
            word: wordInput.value,
        }),
    })
        .then((res) => res.text())
        .then((hbs) => {
            console.log(hbs);
            document.body.innerHTML += hbs;
        });
});
