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

class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
        this.imgUrl = `./images/${suit}/${suit}-${value}.svg`
        this.rank = RANKS[value]
    }
}

// game state variables
let deck, cards, warCards, tieCards, isTie, winner, score1, score2;

// cached references
let fightBtn = document.getElementById('fight')
let playAgainBtn = document.getElementById('reset')
let player1CardEl = document.getElementById('player1Card')
let player2CardEl = document.getElementById('player2Card')
let playerOneScoreEl = document.getElementById('score1');
let playerTwoScoreEl = document.getElementById('score2');

fightBtn.addEventListener('click', handleFight)
playAgain.addEventListener('click', init)

// functions

init()

function init() {
	deck = []
	isTie = false
	SUITS.forEach(suit => {
		VALUES.forEach(val => {
			deck.push(new Card(suit, val))
		})
	})
	dealPlayers()
	warCards = {
		'1': null,
		'-1': null
	}
	tieCards = {
		'1': [],
		'-1': [],
		'original'
	}
	score1 = cards[1].length
	score2 = cards['-1'].length
	render() 
}

function dealPlayers() {
    cards = {
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
        cards[player].push(card)
        player *= -1
    }
}

function compareCards(p1Card, p2Card) {
	if (p1Card.rank > p2Card.rank) {
		return 1
	} else if (p1Card.rank < p2Card.rank) {
		return -1
	} else {
		return null
	}
}

function addCardsToPlayer(cardList, player) {
	cardList.forEach(function(card) {
		cards[player].push(card)
	})
}

// function handleTie() {
// 	isTie = true;
// 	let p1c1 = cards[1].shift()
// 	let p1c2 = cards[1].shift()
// 	let p1c3 = cards[1].shift()

// 	let p2c1 = cards['-1'].shift()
// 	let p2c2 = cards['-1'].shift()
// 	let p2c3 = cards['-1'].shift()

// 	tieCards[1].push(p1c1)
// 	tieCards[1].push(p1c2)
// 	tieCards[1].push(p1c3)

// 	tieCards['-1'].push(p2c1)
// 	tieCards['-1'].push(p2c2)
// 	tieCards['-1'].push(p2c3)
// }

function handleFight(evt) {
	if (isTie) {
		
	} else {
		let card1 = cards['1'].shift()
		let card2 = cards['-1'].shift()
		warCards[1] = card1
		warCards['-1'] = card2
		let dualWinner = compareCards(card1, card2)
		if (dualWinner) {
			addCardsToPlayer([card1, card2], dualWinner)
			score1 = cards['1'].length
			score2 = cards['-1'].length
		} else {
			handleTie()
		}
	}
	render()
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





// //Creates the deck
// let deck = []

// class Card {
//     constructor(suit, value) {
//         this.suit = suit;
//         this.value = value;
//         this.imgUrl = `./images/${suit}/${suit}-${value}.svg`
//         this.rank = RANKS[value]
//     }
// }

// SUITS.forEach(suit => {
//     VALUES.forEach(val => {
//         deck.push(new Card(suit, val))
//     })
// })

// //Splits deck randomly into two decks for players
// let playerDecks = {
//     '1': [],
//     '-1': []
// }

// function splitDeck() {
//     playerDecks = {
//         '1': [],
//         '-1': []
// 	}
//     let player = 1
//     let deckCopy = [].concat(deck)
//     let numCards = deck.length;
//     for (let i = 0; i < numCards; i++) {
//         let cardIndex = Math.floor(Math.random() * deckCopy.length)
//         let returnedCards = deckCopy.splice(cardIndex, 1)
//         let card = returnedCards[0]
//         playerDecks[player].push(card)
//         player *= -1
//     }
// }
// splitDeck()
// console.log(deck)
// console.log(playerDecks)

// //cached references
// let fight = document.getElementById('fight')
// let playAgain = document.getElementById('reset')
// // let tieArena = document.querySelector('tie-arena')
// // tieArena.style.display = 'none';

// //event listeners
// fight.addEventListener('click', initiateWar)
// playAgain.addEventListener('click', resetGame)

// //Game play
// let playerOneScore = 0;
// let playerTwoScore = 0;

// function initiateWar() {
// 	//get card from playerDecks for each player
// 	let playerOneCard = playerDecks[1].shift()
// 	let playerTwoCard = playerDecks[-1].shift()
// 	//change to show image related to card above
// 	let cardOneElement = document.getElementById('player1Card');
// 	cardOneElement.setAttribute('src', playerOneCard.imgUrl);
// 	let cardTwoElement = document.getElementById('player2Card');
// 	cardTwoElement.setAttribute('src', playerTwoCard.imgUrl);
// 	compareCards(playerOneCard, playerTwoCard);
// }	

// //Compares cards to see who wins that battle
// function compareCards(a, b) {
// 	if (a.rank > b.rank) {
// 		playerDecks[1].push(b)
// 		playerDecks[1].push(a)
// 		playerOneScore = playerDecks[1].length
// 		playerTwoScore = playerDecks[-1].length
// 		updateScore();
// 	} else if (a.rank < b.rank) {
// 		playerDecks[-1].push(b)
// 		playerDecks[-1].push(a)
// 		playerOneScore = playerDecks[1].length
// 		playerTwoScore = playerDecks[-1].length
// 		updateScore();
// 	} else {
// 		let titleEl = document.querySelector('h1');
// 		titleEl.innerText = "Go to WAR!!!";
// 		titleEl.style.color = "red";
// 		return goToWar();
// 	}
// 	// check if there are any cards left to play
// 	if (playerDecks[1].length === 0) {
// 		console.log('time to check winner')
// 		fight.remove();
// 		checkWinner();
// 	}
// }
// //displays points on screen
// function updateScore() {
// 	let playerOneScoreEl = document.getElementById('score1');
// 	playerOneScoreEl.innerText = playerOneScore
// 	let playerTwoScoreEl = document.getElementById('score2');
// 	playerTwoScoreEl.innerText = playerTwoScore
// };

// function goToWar() {
// 	//get card from playerDecks for player1
// 	let playerOneCard = playerDecks[1].shift()
// 	let playerOneTie1 = playerDecks[1].shift()
// 	let playerOneTie2 = playerDecks[1].shift()
// 	let playerOneTie3 = playerDecks[1].shift()

// 	//get card from playerDecks for player2
// 	let playerTwoCard = playerDecks[-1].shift()
// 	let playerTwoTie1 = playerDecks[-1].shift()
// 	let playerTwoTie2 = playerDecks[-1].shift()
// 	let playerTwoTie3 = playerDecks[-1].shift()

// 	//player 1 change to show image related to card above
// 	let cardOneElement = document.getElementById('player1Card');
// 	cardOneElement.setAttribute('src', playerOneCard.imgUrl);

// 	let playerOnetie1El = document.getElementById('player1tie1');
// 	playerOnetie1El.setAttribute('src', playerOneTie1.imgUrl);
	
// 	let playerOneTie2El = document.getElementById('player1tie2');
// 	playerOneTie2El.setAttribute('src', playerOneTie2.imgUrl);
	
// 	let playerOneTie3El = document.getElementById('player1tie3');
// 	playerOneTie3El.setAttribute('src', playerOneTie3.imgUrl);

// 	//player 2 change to show image related to card above
// 	let cardTwoElement = document.getElementById('player2Card');
// 	cardTwoElement.setAttribute('src', playerTwoCard.imgUrl);

// 	let playerTwoTie1El = document.getElementById('player2tie1');
// 	playerTwoTie1El.setAttribute('src', playerTwoTie1.imgUrl);
	
// 	let playerTwoTie2El = document.getElementById('player2tie2');
// 	playerTwoTie2El.setAttribute('src', playerTwoTie2.imgUrl);
	
// 	let playerTwoTie3El = document.getElementById('player2tie3');
// 	playerTwoTie3El.setAttribute('src', playerTwoTie3.imgUrl);

// 	//NEED TO:
// 	//insert tie battle area - toggle?
// 	//check winner and push all cards to winner array
// 	//revert header back to normal
// 	//remove tie battle arena
// }	

// //Comparing scores to find a winner
// function checkWinner() {
// 	if (playerOneScore > playerTwoScore) {
// 		document.getElementById('p1Name').insertAdjacentText("beforeend", ` won the war.`)
// 	} else if (playerOneScore < playerTwoScore) {
// 		document.getElementById('p2Name').insertAdjacentText("beforeend", ` won the war.`)
// 	} else {
// 		document.getElementById('p1Name').insertAdjacentText("beforeend", ` tied with Player 2`)
// 		document.getElementById('p2Name').insertAdjacentText("beforeend", ` tied with Player 1`)
// 	}
// }

// //click button to reset game
// function resetGame() {
// 	console.log('reset')
// }