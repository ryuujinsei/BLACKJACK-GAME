/*-------------------------------- Constants --------------------------------*/
const cards = [
  'hearts-A', 'hearts-2', 'hearts-3', 'hearts-4', 'hearts-5', 'hearts-6', 'hearts-7', 'hearts-8', 'hearts-9', 'hearts-10', 'hearts-J', 'hearts-Q', 'hearts-K',
  'diamonds-A', 'diamonds-2', 'diamonds-3', 'diamonds-4', 'diamonds-5', 'diamonds-6', 'diamonds-7', 'diamonds-8', 'diamonds-9', 'diamonds-10', 'diamonds-J', 'diamonds-Q', 'diamonds-K',
  'spades-A', 'spades-2', 'spades-3', 'spades-4', 'spades-5', 'spades-6', 'spades-7', 'spades-8', 'spades-9', 'spades-10', 'spades-J', 'spades-Q', 'spades-K',
  'clubs-A', 'clubs-2', 'clubs-3', 'clubs-4', 'clubs-5', 'clubs-6', 'clubs-7', 'clubs-8', 'clubs-9', 'clubs-10', 'clubs-J', 'clubs-Q', 'clubs-K']

const totalRounds = 5

/*---------------------------- Variables (state) ----------------------------*/
let usedCards = []
let gameOver = true
let playerScore = 0
let dealerScore = 0
let result = ''
let round = 0
let roundOver = true
let playerWins = 0
let dealerWins = 0
let dealerAces = 0
let playerAces = 0


/*------------------------ Cached Element References ------------------------*/
const messageEl = document.querySelector('#message')
const standBtnEl = document.querySelector('stand-btn')
const hitBtnEl = document.querySelector('hit-btn')
const helpBtnEl = document.querySelector('#help-btn')
const playerCardsEl = document.querySelector('#player-cards')
const dealerCardsEl = document.querySelector('#dealer-cards')
const playBtnEl = document.querySelector('#play-btn')

/*-------------------------------- Functions --------------------------------*/
const drawCard = () => {
    const card = cards[(Math.floor(Math.random * cards.length))]
    if (usedCards.includes(card) === true) {
        return drawCard()
    }
    usedCards.push(card)
    return card
}
const startGame = () =>  {
       
}




/*----------------------------- Event Listeners -----------------------------*/