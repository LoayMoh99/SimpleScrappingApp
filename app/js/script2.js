console.log('JS OK!');

const ticketElement = document.getElementById('generated-ticket');
const insertNameElement = document.getElementById('insert-name');
const insertOfferElement = document.getElementById('insert-offer');
const insertCarrozzaElement = document.getElementById('insert-carrozza');
const insertCpElement = document.getElementById('insert-cp');
const insertPriceElement = document.getElementById('insert-price');


insertNameElement.innerText = 'nameValue';
ticketElement.classList.add('visible');
price = 0.8;
console.log(price);

insertOfferElement.innerText = 'اي بتنجان';
insertPriceElement.innerText = price.toFixed(2) + `€`;

const rndCarrozza = Math.floor(Math.random() * 12) +1 ;
const rndCp = Math.floor(Math.random() * 99999) +10000 ;
insertCarrozzaElement.innerText = rndCarrozza;
insertCpElement.innerText = rndCp;

