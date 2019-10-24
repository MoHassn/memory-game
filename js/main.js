/* Shuffling the cards at the begining.*/
let cards = document.querySelectorAll('.card');

//Create the shuffling function
function shuffle (arr) {
    let currentIndex = arr.length-1, temp, randomIndex;
    while (currentIndex >= 0) {
        // Generating random index to swap its value with the currentIndex
        randomIndex = Math.floor(Math.random() * (currentIndex + 1));
        temp = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temp;
        currentIndex --;
    }
    return arr;
}
// Crating an arry of he cards to pass it to the shuffle function
let cardsArray = Array.from(cards);
let shuffledCardsArray = shuffle(cardsArray);

//Creating a documet fragment containing the shuffled array content to add it to the page.
const NEW_CARDS = document.createDocumentFragment();
for (const card of shuffledCardsArray) {
    NEW_CARDS.appendChild(card);
}
const board = document.querySelector('.board');

// Change the cards on the page with the new shuffled ones
board.innerHTML = '';
board.appendChild(NEW_CARDS);

//update the cards list with the new shuffled cards.
cards = document.querySelectorAll('.card');

// Creat event handler function for all cards.

function handleCardClick (event) {
    let target = event.target;
    let card = target.closest('li');
    // if the click was not inside a card then return
    if (!card) return;
    open(card);
}

// Add event listener to  all the board.
board.addEventListener('click', handleCardClick);

// Create open function that opens the cards (adds 'open' class to the card and add the card to openCards list).
function open (card) {
    if (!card.classList.contains('open') && !card.classList.contains('match')){
        card.classList.add('open');
        addToOpenCards(card);
    }
}

// Define Array of open cards
let openCards = [];
// Declare the function that adds cards to openCards list
function addToOpenCards (card) {
    openCards.push(card);
    if (openCards.length == 2){
        checkForMatch();
    }
}
// Declare a function that checks if the two open cards matchs or not( and handle every case) and then empty the openCards list.
function checkForMatch () {
    if (openCards[0].isEqualNode(openCards[1])) {
        match(openCards[0]);
        match(openCards[1]);
        checkForEnd();
        openCards = [];
    }else {
        openCards[0].classList.remove('open');
        openCards[1].classList.remove('open');
        openCards = [];
    }
}
//Declare match() function that adds 'match' class to the two matched cards.
function match (card) {
    card.classList.add('match');
    card.classList.remove('open');
}

// Declare a function that checks if all the cards were matched

function checkForEnd () {
    if (cardsArray.every((element) => element.classList.contains('match'))) {
        // End the game
    }
}