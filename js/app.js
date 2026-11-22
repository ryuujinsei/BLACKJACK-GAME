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
const standBtnEl = document.querySelector('#stand-btn')
const hitBtnEl = document.querySelector('#hit-btn')
const helpBtnEl = document.querySelector('#help-btn')
const playerCardsEl = document.querySelector('#player-cards')
const dealerCardsEl = document.querySelector('#dealer-cards')
const playBtnEl = document.querySelector('#play-btn')
const dealerScoreEl = document.querySelector('#dealer-score')
const playerScoreEl = document.querySelector('#player-score')


/*-------------------------------- Functions --------------------------------*/
// const toggleHelp = () => {

// }


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
    cardImg.src = 'assets/cards/' + card + '.svg'
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

const updateMessage = () => {
    if (gameOver === true) {
        if (playerWins > dealerWins) {
            messageEl.textContent = 'You won the Game'
        } else if (dealerWins > playerWins) {
            messageEl.textContent = 'You lost the Game'
        } else {
            messageEl.textContent = 'The Game is a draw'
        }
    } else if (roundOver === true) {
        if (result === 'win') {
            messageEl.textContent = 'You win this round'
        } else if (result === 'lose') {
            messageEl.textContent = 'You lose this round'
        } else {
            messageEl.textContent = 'This round is a draw'
        }
    } else {
        messageEl.textContent = 'Round ' + round + ': HIT or STAND?'
    }
   
}

const showGame = () => { 
    dealerScoreEl.textContent = 'Dealer Score: ' + dealerScore
    playerScoreEl.textContent = 'Player Score: ' + playerScore
    updateMessage()
}

const startRound = () => {
    dealerScore = 0
    playerScore = 0 
    playerAces11 = false
    dealerAces11 = false
    result = ''
    roundOver = false
    usedCards = []
    dealerCardsEl.innerHTML = null
    playerCardsEl.innerHTML = null
    hitPlayer()
    setTimeout(hitDealer, 300)
    setTimeout(hitPlayer, 600)
    setTimeout(hitDealer, 900)
    hitBtnEl.disabled = false
    standBtnEl.disabled = false
    playBtnEl.disabled = true
    showGame()
}

const startGame = () => {
    round = 1
    playerWins = 0
    dealerWins = 0
    gameOver = false
    startRound()
}

const handlePlay = () => {
    if (gameOver === true) {
        startGame()
    } else {
        round = round + 1
        startRound()
    }
}

const endRound = () => {
    roundOver = true
    if (result === 'win') {
        playerWins = playerWins + 1
    } else if (result === 'lose') {
        dealerWins = dealerWins + 1 
    }

    hitBtnEl.disabled = true
    standBtnEl.disabled = true
    playBtnEl.disabled = false
    
    if (totalRounds > round) {
        playBtnEl.textContent = 'NEXT ROUND'

    } else {
        gameOver = true
        playBtnEl.textContent = 'PLAY AGAIN'
    }
    }


const handleHit = () => {
    if (roundOver === true) {
        return
    }

    hitPlayer()

    if (playerScore > 21) {
        result = 'lose'
        endRound()
    }
    
    showGame()
}

const dealerTurn = () => {
    if (dealerScore >= 17) {
        return
    }

    if (dealerScore < 17) {
        hitDealer()
        dealerTurn()
    }
}

const checkForWinner = () => {
    if (playerScore > 21) {
        result = 'lose'
    } else if (dealerScore > 21) {
        result = 'win'
    } else if (playerScore > dealerScore) {
        result = 'win'
    } else if (dealerScore > playerScore) {
        result = 'lose'
    } else {
        result = 'draw'
    }
}

const handleStand = () => {
    if (roundOver === true) {
        return
    } 
    dealerTurn()
    checkForWinner()
    endRound()
    showGame()
}


/*----------------------------- Event Listeners -----------------------------*/


playBtnEl.addEventListener('click', handlePlay)

standBtnEl.addEventListener('click', handleStand)

hitBtnEl.addEventListener('click', handleHit)







