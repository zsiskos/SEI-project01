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

class Deck {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
        this.imgUrl = `./images/${suit}/${suit}-${value}.svg`
        this.rank = RANKS[value]
    }
}

// game state variables
let deck = []
let playerDecks = {
    '1': [],
    '-1': []
}
let playerOneScore = playerDecks[1].length;
let playerTwoScore = playerDecks[-1].length;
let cardsInPlay = [];

//cached references
	//Game board
let tieArena = document.querySelector('.tie-arena')
let titleEl = document.querySelector('h1');
let fightEl = document.getElementById('fight')
let playAgainEl = document.getElementById('reset')

	//Player Cards
let cardOneElement = document.getElementById('player1Card');
let cardTwoElement = document.getElementById('player2Card');
let playerOneScoreEl = document.getElementById('score1');
let playerTwoScoreEl = document.getElementById('score2');
let playerOnetie1El = document.getElementById('player1tie1');
let playerOneTie2El = document.getElementById('player1tie2');
let playerOneTie3El = document.getElementById('player1tie3');
let playerTwoTie1El = document.getElementById('player2tie1');
let playerTwoTie2El = document.getElementById('player2tie2');
let playerTwoTie3El = document.getElementById('player2tie3');

//event listeners
fightEl.addEventListener('click', initiateWar)
playAgainEl.addEventListener('click', resetGame)


//Functions

init()

function init() {
//Creates the deck
	SUITS.forEach(suit => {
		VALUES.forEach(val => {
			deck.push(new Deck(suit, val))
		})
	})
	splitDeck()
	console.log(deck)
	console.log(playerDecks)
	updateScore()
	//hides tie arena
	tieArena.style.display = 'none';
	
	// render()
}


//Splits deck randomly into two decks for players
function splitDeck() {
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

//Game play

function initiateWar() {
	//get card from playerDecks for each player
	let playerOneCard = playerDecks[1].shift()
	let playerTwoCard = playerDecks[-1].shift()
	//change to show image related to card above
	cardOneElement.setAttribute('src', playerOneCard.imgUrl);
	cardTwoElement.setAttribute('src', playerTwoCard.imgUrl);
	compareCards(playerOneCard, playerTwoCard);
}	

//Compares cards to see who wins that battle
function compareCards(play1, play2) {
	if (play1.rank > play2.rank) {
		playerDecks[1].push(play1)
		playerDecks[1].push(play2)
		updateScore();
	} else if (play1.rank < play2.rank) {
		playerDecks[-1].push(play1)
		playerDecks[-1].push(play2)
		updateScore();
	} else {
		titleEl.innerText = "Go to WAR!!!";
		titleEl.style.color = "red";
		tieArena.style.display = 'flex';
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
	playerOneScore = playerDecks[1].length
	playerTwoScore = playerDecks[-1].length
	playerOneScoreEl.innerText = playerOneScore
	playerTwoScoreEl.innerText = playerTwoScore
};

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
	cardOneElement.setAttribute('src', playerOneCard.imgUrl);
	playerOnetie1El.setAttribute('src', playerOneTie1.imgUrl);
    playerOneTie2El.setAttribute('src', playerOneTie2.imgUrl);
	playerOneTie3El.setAttribute('src', playerOneTie3.imgUrl);

	//player 2 change to show image related to card above
	cardTwoElement.setAttribute('src', playerTwoCard.imgUrl);
	playerTwoTie1El.setAttribute('src', playerTwoTie1.imgUrl);
	playerTwoTie2El.setAttribute('src', playerTwoTie2.imgUrl);
	playerTwoTie3El.setAttribute('src', playerTwoTie3.imgUrl);

	//NEED TO:
	//insert tie battle area - toggle?
	//check winner and push all cards to winner array
	//revert header back to normal
	//remove tie battle arena
}	

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


function render() {
	// show either card backs or current war cards
	let card1 = warCards['1']
	player1CardEl.src = card1 ? card1.imgUrl : "images/backs/blue.svg"

	let card2 = warCards['-1']
	player2CardEl.src = card2 ? card2.imgUrl : "images/backs/blue.svg"

	// show player score
	playerOneScoreEl.innerHTML = score1
	playerTwoScoreEl.innerHTML = score2

	// if "isTie", shows tie cards as well
		// show the tieCards

	// if not
		// hide the tieCards

	// winner
}


































