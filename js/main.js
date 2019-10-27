/* Shuffling the cards at the begining.*/
let cards = document.querySelectorAll('.card');

const board = document.querySelector('.board');

let modal = document.querySelector('.modal');
let modalContent = document.querySelector('.modal-content');


// This is for the timer to know if the game is running or not

let playing = false;

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
/*
Wrap all the code that updates the content on the page in a function
*/
function updateCards(cards) {
    // Crating an arry of he cards to pass it to the shuffle function
    let cardsArray = Array.from(cards);
    let shuffledCardsArray = shuffle(cardsArray);

    //Creating a documet fragment containing the shuffled array content to add it to the page.
    const NEW_CARDS = document.createDocumentFragment();
    for (const card of shuffledCardsArray) {
        NEW_CARDS.appendChild(card);
    }

    // Change the cards on the page with the new shuffled ones
    board.innerHTML = '';
    board.appendChild(NEW_CARDS);
    //update the cards list with the new shuffled cards.
    cards = document.querySelectorAll('.card');
    playing = true;
}

// To update the cards with shuffeled ones at the begining.
updateCards(cards);


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
// Define a moves counter
let moves = 0;

// Define a function that increment the moves and change it on the page
// every time there is a checkForMatch
let stars = document.querySelectorAll('.a-star');
let starToBeHidden = 2;
function incrementMoves () {
    moves++;
    document.querySelector('.moves').innerText = moves;
    if(moves == 10 || moves == 20) {
        stars[starToBeHidden].style.display = 'none';
        starToBeHidden --;
    }
}
// Declare a function that checks if the two open cards matchs or not( and handle every case) and then empty the openCards list.
function checkForMatch () {
    incrementMoves();
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
    if (Array.from(cards).every((element) => element.classList.contains('match'))) {
        playing = false;
        const SCORE_PANEL = document.querySelector('.score-panel');
        const MODAL_SCORE_PANEL = SCORE_PANEL.cloneNode(true);
        MODAL_SCORE_PANEL.lastElementChild.remove();
        const TO_INSERT_BEFORE = document.querySelector('.to-inset-before');
        modalContent.insertBefore(MODAL_SCORE_PANEL, TO_INSERT_BEFORE);
        modal.style.display = 'block';
    }
}

/*
   Define a function to call it when we wand to restart the game
*/
function restart () {
    // Hide all the cards
    Array.from(cards).forEach((elem) => elem.className = 'card');
    // Shuffle the cards and
    updateCards(cards);

    openCards = [];
    // Reset the moves counter
    moves = 0;
    document.querySelector('.moves').innerText = moves;

    // Reset the timer
    seconds = 0;
    document.querySelector('.time').innerText = seconds;

    // Remove the socre panel from the modal if exists
    if (modal.querySelector('.score-panel')) {
        modal.querySelector('.score-panel').remove();
    }

    // Reset the stars
    for (let star of stars) {
        star.style.display = 'list-item';
    }
}

// Add event listener to the restart button
document.querySelector('.restart').addEventListener('click', restart);

let seconds = 0;
function setTime () {
    if (playing) {
        seconds ++;
        document.querySelector('.time').innerText = seconds;
    }
}

setInterval(setTime, 1000);

document.addEventListener('click', function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
})
const PLAY_AGAIN = modal.querySelector('.play-again');

function playAgain () {
    modal.style.display = 'none';
    restart();
}
PLAY_AGAIN.addEventListener('click', playAgain);