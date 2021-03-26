const searchBtn = document.querySelector('#searchBtn');
const wordInput = document.querySelector('#wordInput');
const select = document.querySelector('#select')

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();

  fetch(`https://wordsapiv1.p.rapidapi.com/words/${wordInput.value}/${select.value}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "d799736d4cmshcab9f115d05bc3bp17e8eejsn319a7f394fbd",
      "x-rapidapi-host": "wordsapiv1.p.rapidapi.com"
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      fetch('/', {
        "method": "POST",
        "headers": {
          'Content-type': 'Application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res=>res.text()).then(hbs=> {
        document.body.innerHTML += hbs
      })
    }
    )
    .catch(err => {
      console.error(err);
    });
})
