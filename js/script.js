const SUITS = ['hearts', 'diamonds', 'clubs', 'spades']
const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const RANKS = {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    'J': 11,
    'Q': 12,
    'K': 13,
    'A': 14
}

class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
        this.imgUrl = `./images/${suit}/${suit}-${value}.svg`
        this.rank = RANKS[value]
    }
}

let deck = []
let playerDecks = {
    '1': [],
    '-1': []
}

SUITS.forEach(suit => {
    VALUES.forEach(val => {
        deck.push(new Card(suit, val))
    })
})

function splitDeck() {
    playerDecks = {
        '1': [],
        '-1': []
	}
	
    let player = 1
    let deckCopy = [].concat(deck)
    let numCards = deck.length;
    for (let i = 0; i < numCards; i++) {
        let cardIndex = Math.floor(Math.random() * deckCopy.length)
        let returnedCards = deckCopy.splice(cardIndex, 1)
        let card = returnedCards[0]
        playerDecks[player].push(card)
        player *= -1
    }
}
splitDeck()
console.log(deck)
console.log(playerDecks)

//cached element references
// something to change winner Message

//event listeners

document.getElementById('fight').addEventListener('click', initiateWar)
document.getElementById('reset').addEventListener('click', resetGame)


// * loadGame logic:
//     - Initialize all state variables by calling init()
//         - deckOfCards with all the cards gets randomly pushed into two arrays, player1Cards and player2Cards arrays
//         - fight button is displayed
//         - player1Score and player2Score set to 0
//         - cardInPlay1 and cardInPlay2 variables reset
//         - player names updated (see stretch goals for player names)
//     - Update the display by calling render()
//         - console.log that game has started


//Creates the game board for cards
// function createBoard() {
// 	for (let i = 0; i < cards.length; i++) {
// 		let cardElement = document.createElement('img');
// 		cardElement.setAttribute('src', 'images/back/blue.svg');
// 		cardElement.setAttribute('data-id', i)
// 		cardElement.addEventListener('click', flipCard);
// 		document.getElementById('game-board').appendChild(cardElement);
// 	};	
// };

// createBoard();

//Game play
// * initiateWar logic:
//	- it takes the imgUrl and updates the img in the HTML to show the card
//	- it takes the values and compares them
// - it checks the the array length 
	//	- if not 0 then does nothing)
	// - if 0 then initiates checkWinner

function initiateWar() {
	console.log('fight')
	//get card from playerDecks for each player
	let playerOneCard = playerDecks[1].shift()
	let playerTwoCard = playerDecks[-1].shift()
	console.log(playerOneCard)
	console.log(playerTwoCard)
	//change to show image related to card above
	let cardOneElement = document.getElementById('player1Card');
	cardOneElement.setAttribute('src', playerOneCard.imgUrl);

	let cardTwoElement = document.getElementById('player2Card');
	cardTwoElement.setAttribute('src', playerTwoCard.imgUrl);
	//compare values to award points
	

	// check if there are any cards left to play

}; 



//click button to reset game
function resetGame() {
	console.log('reset')
}; 


//Comparing scores to find a winner




