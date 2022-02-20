const cards = document.querySelectorAll('.memory-card');
const restartBtn = document.querySelector('.restart');
const scoreBtn = document.querySelector('.score');
const closeBtn = document.querySelector('.close');
const scoreSheet = document.querySelector('.score-sheet');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let attemptsSpan = document.querySelector('.try');
let att = 1;
let pairs = 0;
let isWin = false;


function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');
    attemptsSpan.textContent = att;
    if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
    }

    secondCard = this;

    // hasFlippedCard = false;
    checkForMatch();
    checkWin();
}

function checkForMatch() {
    if (firstCard.dataset.hero === secondCard.dataset.hero) {
        disableCards();
        pairs++;
        return;
    }
    unflipCards();
}

function checkWin() {
    if(pairs == (cards.length / 2)) {
        isWin = true;
    }
    if (isWin) {
        var name = window.prompt("Congratulations! You win!!!\nEnter your name: ");
        alert("Your name is " + name);
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        // lockBoard = false;
        att++;
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function restartGame() {
    document.location.reload();
}

(function shuffle() {
    cards.forEach(card => {
      let ramdomPos = Math.floor(Math.random() * cards.length);
      card.style.order = ramdomPos;
    });
    console.log(cards.length / 2);
})();

function showScore() {
    scoreSheet.style.display = 'block';
}

function closeScore() {
    scoreSheet.style.display = 'none';
}

restartBtn.addEventListener('click', restartGame);
scoreBtn.addEventListener('click', showScore);
closeBtn.addEventListener('click', closeScore);
// console.log(restartBtn);
cards.forEach(card => card.addEventListener('click', flipCard));