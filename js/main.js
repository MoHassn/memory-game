/* Shuffling the cards at the begining.*/
const cards = document.querySelectorAll('.card');

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
board.innerHTML = '';
board.appendChild(NEW_CARDS);