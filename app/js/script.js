console.log('JS OK!');

// Recupero gli elementi in pagina
const nameElement = document.getElementById('name');
const yearElement = document.getElementById('year');
const ageElement = document.getElementById('age');
const buttonElement = document.getElementById('generate');
const buttonDeleteElement = document.getElementById('cancel');

// Faccio funzionare i button
buttonElement.addEventListener('click', function () {
    const nameValue = nameElement.value;
    const kmValue = parseInt(yearElement.value);
    const ageValue = ageElement.value;

    console.log(nameValue);
    console.log(kmValue);
    console.log(ageValue);

    nameElement.value = '';
    yearElement.value = '';
    ageElement.value = '';

    
    // add delay i.e. as if loading 
    setInterval(() => {
        
        // navigate to the next page
        window.location.href = 'newPage.html';

    }, 50);
});

buttonDeleteElement.addEventListener('click', function () {
    nameElement.value = '';
    yearElement.value = '';
    ageElement.value = '';

    insertNameElement.innerText = '';
    insertOfferElement.innerText = '';
    insertCarrozzaElement.innerText = '';
    insertCpElement.innerText = '';
    insertPriceElement.innerText = '';

    ticketElement.classList.remove('visible');
});

function myfunction(index) {
    console.log('Button ' + index + ' clicked!');
}