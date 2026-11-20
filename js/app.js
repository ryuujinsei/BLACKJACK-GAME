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
let dealerAces11 = false
let playerAces11 = false


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
    const card = cards[(Math.floor(Math.random() * cards.length))]
    if (usedCards.includes(card) === true) {
        return drawCard()
    }
    usedCards.push(card)
    return card
}

const cardValue = (card) => {
    const value = card.split('-')[1]
    if (value === 'A') {
        return 11
    } else if (value === 'J' || value === 'Q' || value === 'K') {
        return 10
    } else {
        return Number(value)
    }
}

const showCard = (card, section) => {
    const cardImg = document.createElement('img')
    cardImg.src = '/assets/cards/' + card + '.svg'
    cardImg.alt = card 
    section.appendChild(cardImg)

}

const hitPlayer = () => {
    const drawnCard = drawCard()
    showCard(drawnCard, playerCardsEl)
    if (cardValue(drawnCard) === 11) {
        if (playerScore + 11 > 21) {
            playerScore = playerScore + 1
        } else {
            playerScore = playerScore + 11 
            playerAces11 = true
        }
    } else {
        playerScore = playerScore + cardValue(drawnCard)
    }

    if (playerScore > 21 && playerAces11 === true) {
        playerScore = playerScore -10
        playerAces11 = false
    }
}

const hitDealer = () => {
        const drawnCard = drawCard()
    showCard(drawnCard, dealerCardsEl)
    if (cardValue(drawnCard) === 11) {
        if (dealerScore + 11 > 21) {
            dealerScore = dealerScore + 1
        } else {
            dealerScore = dealerScore + 11 
            dealerAces11 = true
        }
    } else {
        dealerScore = dealerScore + cardValue(drawnCard)
    }

    if (dealerScore > 21 && dealerAces11 === true) {
        dealerScore = dealerScore -10
        dealerAces11 = false
    }
}




// const startGame = () =>  {
       
// }




/*----------------------------- Event Listeners -----------------------------*/