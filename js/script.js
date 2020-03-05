//Constant variables/obj
const SUITS = ['hearts', 'diamonds', 'clubs', 'spades']
const SUITRANK = {
	'hearts': 01,
	'diamonds': 02,
	'clubs': 03,
	'spades': 04
}
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
		this.suitrank = SUITRANK[suit];
        this.value = value;
        this.imgUrl = `./images/${suit}/${suit}-${value}.svg`;
        this.rank = RANKS[value]
    }
}

const PLAYERNAMES = {
	'DarthVadar': 'Luke SkyWalker'
}

// names = [['D', 'L'], []]

// Object.keys(PLAYERNAMES) === ["Darth"]
// PLAYERNAMES[arr[0]]

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
let inPlay;
let playerOneName, playerTwoName;

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

	//playerNames
let playerOneNameEl = document.getElementById('p1Name')
let playerTwoNameEl = document.getElementById('p2Name')

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
	//Creates the deck
	SUITS.forEach(suit => {
		VALUES.forEach(val => {
			deck.push(new Deck(suit, val))
		})
	})
	//assigns players names
	playerOneName = PLAYERNAMES['DarthVadar']
	//deals cards to players
	splitDeck()
	console.log(deck)
	console.log(playerDecks)
	renderTieArena()
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
		renderTieArena()
		playerOneCard = playerDecks[1].shift()
		playerTwoCard = playerDecks[-1].shift()
		cardsInPlay.unshift(playerOneCard, playerTwoCard)
	} else if (isTie) {
		playerOneCard = playerDecks[1].shift()
		playerOneTie1 = playerDecks[1].shift()
		playerOneTie2 = playerDecks[1].shift()
		playerOneTie3 = playerDecks[1].shift() 
		playerTwoCard = playerDecks[-1].shift()
		playerTwoTie1 = playerDecks[-1].shift()
		playerTwoTie2 = playerDecks[-1].shift()
		playerTwoTie3 = playerDecks[-1].shift()
		cardsInPlay.unshift(playerOneCard, playerOneTie1, playerOneTie2, playerOneTie3, playerTwoCard, playerTwoTie1, playerTwoTie2, playerTwoTie3)
		console.log(cardsInPlay)
		renderTieCards()
	} 
	compareCards(playerOneCard.rank, playerTwoCard.rank)
	render()
}


//Compares cards to see who wins that battle
function compareCards(play1, play2) {
	console.log("checking")
	if (play1 > play2) {
		cardsInPlay.forEach(function(card) {
			playerDecks[1].push(card)	
		})
		cardsInPlay = []
		isTie = false
	} else if (play1 < play2) {
		cardsInPlay.forEach(function(card) {
			playerDecks[-1].push(card)
		})
		cardsInPlay = []
		isTie = false
	} else {
		if (playerDecks[1].length < 4 || playerDecks[-1].length < 4) {
			compareCards(playerOneCard.suitrank, playerTwoCard.suitrank)
		} else {
			isTie = true
			renderTieArena()
		}
	}  
	console.log(cardsInPlay)
	console.log(playerDecks)
	// check if there are any cards left to play
	
	if (playerDecks[1].length === 0 || playerDecks[-1].length === 0) {
		console.log('time to check winner')
		checkWinner();
	}
}



//Comparing final scores to find a winner
function checkWinner() {
	if (playerDecks[1].length > playerDecks[-1].length) {
		winner = 1
	} else {
		winner = -1
	}
	render();
}

//click button to reset game
function resetGame() {
	console.log('reset')
}

function render() {
	//change names based on picker
	
	//change card based on playercards
	cardOneElement.src = inPlay ? playerOneCard.imgUrl : "images/backs/blue.svg"
	cardTwoElement.src = inPlay ? playerTwoCard.imgUrl : "images/backs/blue.svg"
	//change score based on length of player array
	playerOneScoreEl.innerHTML = playerDecks[1].length
	playerTwoScoreEl.innerHTML = playerDecks[-1].length
	//show winner based on winner
	if (winner === 1) {
		fightEl.style.visibility = 'hidden'
		document.getElementById('p1Name').insertAdjacentText("beforeend", ` won the war.`)
	} else if (winner === -1) {
		fightEl.style.visibility = 'hidden'
		document.getElementById('p2Name').insertAdjacentText("beforeend", ` won the war.`)
	} else {
		playerOneNameEl.innerHTML = playerOneName
		playerTwoNameEl.innerHTML = "Player 2"
		fightEl.style.visibility = 'visible'
		
	}
}

function renderTieCards() {
	playerOneTie1El.setAttribute('src', playerOneTie1.imgUrl)
	playerOneTie2El.setAttribute('src', playerOneTie2.imgUrl)
	playerOneTie3El.setAttribute('src', playerOneTie3.imgUrl)
	playerTwoTie1El.setAttribute('src', playerTwoTie1.imgUrl)
	playerTwoTie2El.setAttribute('src', playerTwoTie2.imgUrl)
	playerTwoTie3El.setAttribute('src', playerTwoTie3.imgUrl)
}

function renderTieArena () {
	if (isTie) {
		titleEl.innerText = "Go to WAR!";
		titleEl.style.color = "red";
		tieArena.style.display = 'flex'
	} else if (!isTie) {
	titleEl.innerText = "WAR";
	titleEl.style.color = "#7585AB";
	tieArena.style.display = 'none'
	playerOneTie1El.setAttribute('src', "images/backs/blue.svg")
	playerOneTie2El.setAttribute('src', "images/backs/blue.svg")
	playerOneTie3El.setAttribute('src', "images/backs/blue.svg")
	playerTwoTie1El.setAttribute('src', "images/backs/blue.svg")
	playerTwoTie2El.setAttribute('src', "images/backs/blue.svg")
	playerTwoTie3El.setAttribute('src', "images/backs/blue.svg")
	}
}


// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let instructVid = document.getElementById("instructions");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
instructions.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}