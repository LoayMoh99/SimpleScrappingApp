console.log('JS OK!');

// Recupero gli elementi in pagina
const nameElement = document.getElementById('name');
const kmElement = document.getElementById('km');
const ageElement = document.getElementById('age');
const buttonElement = document.getElementById('generate');
const buttonDeleteElement = document.getElementById('cancel');

// Faccio funzionare i button
buttonElement.addEventListener('click', function () {
    const nameValue = nameElement.value;
    const kmValue = parseInt(kmElement.value);
    const ageValue = ageElement.value;

    console.log(nameValue);
    console.log(kmValue);
    console.log(ageValue);

    nameElement.value = '';
    kmElement.value = '';
    ageElement.value = '';

    
    // add delay i.e. as if loading 
    setInterval(() => {
        
        // navigate to the next page
        window.location.href = 'newPage.html';

    }, 50);
});

buttonDeleteElement.addEventListener('click', function () {
    nameElement.value = '';
    kmElement.value = '';
    ageElement.value = '';

    insertNameElement.innerText = '';
    insertOfferElement.innerText = '';
    insertCarrozzaElement.innerText = '';
    insertCpElement.innerText = '';
    insertPriceElement.innerText = '';

    ticketElement.classList.remove('visible');
});