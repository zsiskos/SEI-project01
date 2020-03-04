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
let cardsInPlay = [];
let playerOneCard, playerOneTie1, playerOneTie2, playerOneTie3
let playerTwoCard, playerTwoTie1, playerTwoTie2, playerTwoTie3
let winner;
let isTie;
let isTieDeal;
let inPlay;
		playerOneTie1 = playerDecks[1].shift()
		playerOneTie2 = playerDecks[1].shift()
		playerOneTie3 = playerDecks[1].shift() 
		playerTwoTie1 = playerDecks[-1].shift()
		playerTwoTie2 = playerDecks[-1].shift()
		playerTwoTie3 = playerDecks[-1].shift()

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
let playerOneTie1El = document.getElementById('player1tie1');
let playerOneTie2El = document.getElementById('player1tie2');
let playerOneTie3El = document.getElementById('player1tie3');
let playerTwoTie1El = document.getElementById('player2tie1');
let playerTwoTie2El = document.getElementById('player2tie2');
let playerTwoTie3El = document.getElementById('player2tie3');

//event listeners
fightEl.addEventListener('click', initiateWar)
playAgainEl.addEventListener('click', init)


//Functions

init()

function init() {
	//sets game state to normal
	inPlay = false
	winner = false
	deck = []
	playerDecks = {
		'1': [],
		'-1': []
	}
	cardsInPlay = []
	isTie = false
	isTieDeal = false
	//Creates the deck
	SUITS.forEach(suit => {
		VALUES.forEach(val => {
			deck.push(new Deck(suit, val))
		})
	})
	//deals cards to players
	splitDeck()
	console.log(deck)
	console.log(playerDecks)
	renderNoMoreTie()
	render()
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

//Game play, when FIGHT is clicked
function initiateWar() {
	inPlay = true
	if (!isTie) {
		renderNoMoreTie()
		playerOneCard = playerDecks[1].shift()
		playerTwoCard = playerDecks[-1].shift()
		cardsInPlay.unshift(playerOneCard, playerTwoCard)
	} else if (isTie) {
		isTieDeal = true
		playerOneCard = playerDecks[1].shift()
		playerOneTie1 = playerDecks[1].shift()
		playerOneTie2 = playerDecks[1].shift()
		playerOneTie3 = playerDecks[1].shift() 
		playerTwoCard = playerDecks[-1].shift()
		playerTwoTie1 = playerDecks[-1].shift()
		playerTwoTie2 = playerDecks[-1].shift()
		playerTwoTie3 = playerDecks[-1].shift()
		cardsInPlay.unshift(playerOneCard, playerOneTie1,playerOneTie2, playerOneTie3, playerTwoCard, playerTwoTie1, playerTwoTie2, playerTwoTie3)
		console.log(cardsInPlay)			
	} 
	
	compareCards(playerOneCard,playerTwoCard)
	render()
	
}	

//Compares cards to see who wins that battle
function compareCards(play1, play2) {
	console.log("checking")
	if (play1.rank > play2.rank) {
		cardsInPlay.forEach(function(card) {
			playerDecks[1].push(card)	
		})
		cardsInPlay = []
		isTie = false		
	} else if (play1.rank < play2.rank) {
		cardsInPlay.forEach(function(card) {
			playerDecks[-1].push(card)
		})
		cardsInPlay = []
		isTie = false
	} else {
		isTie = true
		titleEl.innerText = "Go to WAR!";
		titleEl.style.color = "red";
		tieArena.style.display = 'flex'
		}  
	console.log(cardsInPlay)
	console.log(playerDecks)
	// check if there are any cards left to play
	if (playerDecks[1].length === 0) {
		console.log('time to check winner')
		fight.remove();
		checkWinner();
	}
}


//Comparing final scores to find a winner
function checkWinner() {
	if (playerOneScore > playerTwoScore) {
		winner = 1
	} else if (playerOneScore < playerTwoScore) {
		winner = -1
	} else {
		winner = 2
	}
}

//click button to reset game
function resetGame() {
	console.log('reset')
}

function render() {
	//change card based on playercards
	cardOneElement.src = inPlay ? playerOneCard.imgUrl : "images/backs/blue.svg"
	cardTwoElement.src = inPlay ? playerTwoCard.imgUrl : "images/backs/blue.svg"
	if (isTieDeal) {
		playerOneTie1El.setAttribute('src', playerOneTie1.imgUrl)
		playerOneTie2El.setAttribute('src', playerOneTie2.imgUrl)
		playerOneTie3El.setAttribute('src', playerOneTie3.imgUrl)
		playerTwoTie1El.setAttribute('src', playerTwoTie1.imgUrl)
		playerTwoTie2El.setAttribute('src', playerTwoTie2.imgUrl)
		playerTwoTie3El.setAttribute('src', playerTwoTie3.imgUrl)
	}
	
	//change score based on length of player array
	playerOneScoreEl.innerHTML = playerDecks[1].length
	playerTwoScoreEl.innerHTML = playerDecks[-1].length

	//show winner based on winner
		//player one wins
		if (winner === 1) {
			document.getElementById('p1Name').insertAdjacentText("beforeend", ` won the war.`)
		} else if (winner === -1) {
			document.getElementById('p2Name').insertAdjacentText("beforeend", ` won the war.`)
		} else if (winner === 2) {
			document.getElementById('p1Name').insertAdjacentText("beforeend", ` tied with Player 2`)
			document.getElementById('p2Name').insertAdjacentText("beforeend", ` tied with Player 1`)
		}

}

function renderNoMoreTie () {
	titleEl.innerText = "WAR";
	titleEl.style.color = "#7585AB";
	tieArena.style.display = 'none'
	
	// playerOneTie1El.setAttribute('src', playerOneTie1.imgUrl)
	// playerOneTie2El.setAttribute('src', playerOneTie2.imgUrl)
	// playerOneTie3El.setAttribute('src', playerOneTie3.imgUrl)
	// playerTwoTie1El.setAttribute('src', playerTwoTie1.imgUrl)
	// playerTwoTie2El.setAttribute('src', playerTwoTie2.imgUrl)
	// playerTwoTie3El.setAttribute('src', playerTwoTie3.imgUrl)
	}





































