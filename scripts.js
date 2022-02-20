const cards = document.querySelectorAll('.memory-card');
const restartBtn = document.querySelector('.restart');
const scoreBtn = document.querySelector('.score');
const closeBtn = document.querySelector('.close');
const scoreSheet = document.querySelector('.score-sheet');
const scoreTable = document.querySelector('.score-table');
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
        setTimeout(() => {
            var name = window.prompt("Congratulations! You win!!!\nEnter your name: ");
            let keys = Object.keys(localStorage)
            let arr = [name, att];
            localStorage.setItem(isNaN(keys[keys.length-1]) ? 1 : (Number(keys[keys.length-1]) + 1), arr);
            scoreTable.insertAdjacentHTML('beforeend', `<tr><td>${name}</td><td>${att}</td></tr>`);
    }, 800);

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

    let keys = Object.keys(localStorage);
    if (keys.length > 10) {
        while (keys.length > 10) {
            localStorage.removeItem(keys[0]);
        }
    }
    for(let key of keys) {
        if (Number(key) > 0) {
            let str = localStorage.getItem(key[0]).split(',');
            // alert(`${key}: ${localStorage.getItem(key)}`);
            scoreTable.insertAdjacentHTML('beforeend', `<tr><td>${str[0]}</td><td>${str[1]}</td></tr>`);
        }
    }
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

console.log("Футер находится в таблице игроков.");