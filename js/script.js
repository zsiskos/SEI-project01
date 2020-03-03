//Constant variables/obj
const SUITS = ['hearts', 'diamonds', 'clubs', 'spades']
const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const RANKS = {
    '2': 02,
    '3': 03,
    '4': 04,
    '5': 05,
    '6': 06,
    '7': 07,
    '8': 08,
    '9': 09,
    '10': 10,
    'J': 11,
    'Q': 12,
    'K': 13,
    'A': 14
}

//Creates the deck
let deck = []

class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
        this.imgUrl = `./images/${suit}/${suit}-${value}.svg`
        this.rank = RANKS[value]
    }
}

SUITS.forEach(suit => {
    VALUES.forEach(val => {
        deck.push(new Card(suit, val))
    })
})

//Splits deck randomly into two decks for players
let playerDecks = {
    '1': [],
    '-1': []
}

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

//cached references
fight = document.getElementById('fight')
playAgain = document.getElementById('reset')

//event listeners
fight.addEventListener('click', initiateWar)
playAgain.addEventListener('click', resetGame)

//Game play
let playerOneScore = 0;
let playerTwoScore = 0;

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
	//Winning player keeps both cards NEW FEATURE
	if (playerOneCard.rank > playerTwoCard.rank) {
		playerDecks[1].push(playerTwoCard)
		playerDecks[1].push(playerOneCard)
		playerOneScore = playerDecks[1].length
		playerTwoScore = playerDecks[-1].length
		updateScore();
		console.log("player1 pt")
	} else if (playerOneCard.rank < playerTwoCard.rank) {
		playerDecks[-1].push(playerTwoCard)
		playerDecks[-1].push(playerOneCard)
		playerOneScore = playerDecks[1].length
		playerTwoScore = playerDecks[-1].length
		updateScore();
	} else {
		return goToWar();
	}
	// check if there are any cards left to play
	if (playerDecks[1].length === 0) {
		console.log('time to check winner')
		fight.remove();
		checkWinner();
	}
}

//displays points on screen
function updateScore() {
	let playerOneScoreEl = document.getElementById('score1');
	playerOneScoreEl.innerText = playerOneScore
	let playerTwoScoreEl = document.getElementById('score2');
	playerTwoScoreEl.innerText = playerTwoScore
};



		//tie function to go to war
		// change header to "go to war" in red, and display tie arena, change button to read "go to war" IS THIS NEEDED?
		// if doin button, then player must hit to activate
		//deal 3 cards from player1 deck to tie arena and 1 to play area, do same for player2
		// whoever win, gets all the cards

function goToWar() {
	//get card from playerDecks for player1
	let playerOneCard = playerDecks[1].shift()
	let playerOneTie1 = playerDecks[1].shift()
	let playerOneTie2 = playerDecks[1].shift()
	let playerOneTie3 = playerDecks[1].shift()

	//get card from playerDecks for player2
	let playerTwoCard = playerDecks[-1].shift()
	let playerTwoTie1 = playerDecks[-1].shift()
	let playerTwoTie2 = playerDecks[-1].shift()
	let playerTwoTie3 = playerDecks[-1].shift()

	//player 1 change to show image related to card above
	let cardOneElement = document.getElementById('player1Card');
	cardOneElement.setAttribute('src', playerOneCard.imgUrl);

	let playerOnetie1El = document.getElementById('player1tie1');
	playerOnetie1El.setAttribute('src', playerOneTie1.imgUrl);
	
	let playerOneTie2El = document.getElementById('player1tie2');
	playerOneTie2El.setAttribute('src', playerOneTie2.imgUrl);
	
	let playerOneTie3El = document.getElementById('player1tie3');
	playerOneTie3El.setAttribute('src', playerOneTie3.imgUrl);

	//player 2 change to show image related to card above
	let cardTwoElement = document.getElementById('player2Card');
	cardTwoElement.setAttribute('src', playerTwoCard.imgUrl);

	let playerTwoTie1El = document.getElementById('player2tie1');
	playerTwoTie1El.setAttribute('src', playerTwoTie1.imgUrl);
	
	let playerTwoTie2El = document.getElementById('player2tie2');
	playerTwoTie2El.setAttribute('src', playerTwoTie2.imgUrl);
	
	let playerTwoTie3El = document.getElementById('player2tie3');
	playerTwoTie3El.setAttribute('src', playerTwoTie3.imgUrl);
}	
	
// 	//change to show image related to card above
	
	
	
// 	let cardTwoElement = document.getElementById('player2Card');
// 	cardTwoElement.setAttribute('src', playerTwoCard.imgUrl);
	
// 	let playerTwoCard = playerDecks[-1].shift()
	
// 	//Winning player keeps both cards NEW FEATURE
// 	if (playerOneCard.rank > playerTwoCard.rank) {
// 		playerDecks[1].push(playerTwoCard)
// 		playerDecks[1].push(playerOneCard)
// 		playerOneScore = playerDecks[1].length
// 		playerTwoScore = playerDecks[-1].length
// 		console.log("player1 pt")
// 	} else if (playerOneCard.rank < playerTwoCard.rank) {
// 		playerDecks[-1].push(playerTwoCard)
// 		playerDecks[-1].push(playerOneCard)
// 		playerOneScore = playerDecks[1].length
// 		playerTwoScore = playerDecks[-1].length
// 	} else {

// 	}

// 	//compare values to award points
// 	if (playerOneCard.rank > playerTwoCard.rank) {
// 		playerOneScore += 1
// 		console.log("player1 pt")
// 	} else if (playerOneCard.rank < playerTwoCard.rank) {
// 		playerTwoScore += 1 
// 		console.log("player2 pt")
// 	} else {
// 		console.log("tie")
// 	}


//Comparing scores to find a winner
function checkWinner() {
	if (playerOneScore > playerTwoScore) {
		document.getElementById('p1Name').insertAdjacentText("beforeend", ` won the war.`)
	} else if (playerOneScore < playerTwoScore) {
		document.getElementById('p2Name').insertAdjacentText("beforeend", ` won the war.`)
	} else {
		document.getElementById('p1Name').insertAdjacentText("beforeend", ` tied with Player 2`)
		document.getElementById('p2Name').insertAdjacentText("beforeend", ` tied with Player 1`)
	}
}

//click button to reset game
function resetGame() {
	console.log('reset')
}