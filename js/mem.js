const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false; //this is so the cards won't flip back once they are matched 
let firstCard, secondCard;
let timeStart = "";
let matchCount = 0; //added by Carlos


//lets us know which card the player clicked so that we can do the match 

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return; //https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval#The_this_problem

    this.classList.add('flip');
    //suggestions from Chase for the Modal popup 
    let cardImages = this.childNodes;
    cardImages[1].style.display = "block";
    console.log(cardImages[1]);
    cardImages[3].style.display = "none";
    console.log(cardImages[3]);

    console.log(this + ": flipped");

    //this keyword is dynamically set to this context
    //it is representing memory card element which is was fired
    //toggle means if the class is there remove it, if it's not there then add it 
    //not really understanding how .this works 

    if (!hasFlippedCard) { //first click !
        hasFlippedCard = true;
        firstCard = this;
        startTimer();
        return;
    }

    //second click        
    secondCard = this;
    checkForMatch();
    addMove();
    removeStars();
}

// matching the cards - refactoring 
//determining if the the cards match 
// using the data attribute within the HTML to do this 
function checkForMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card; //this is if its a match



    isMatch ? disableCards() : unflipCards();
    //startTimer();
}

//if => 8 modal popup still need to configure this 
function disableCards() {
    firstCard.removeEventListener('click', flipCard); //remove the eventListener if it's a match. You have to add the event and the function that you called 
    secondCard.removeEventListener('click', flipCard); //remove the eventListener if it's a match
    resetCard();
    matchCount++;
    console.log(matchCount);
    if (matchCount >= 8) {
        console.log('Game over!');
        //stopTimer();
        if (matchCount >= 8) {
            gameOver();
        }
 //modal needs to pop up 
        function gameOver() {
            stopTimer();
            openModal();
        }
        modal.style.display = "block";
        
       
    }
}

// if they don't match 
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        //so that we can see the card flip
        // setTimeout excutes after waiting a specified amount of time
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        //help from chase , basically I need to add the style.display for the modal to popup 
        firstCardChildren = firstCard.childNodes;
        secondCardChildren = secondCard.childNodes;
        firstCardChildren[3].style.display = "block";
        firstCardChildren[1].style.display = "none";
        secondCardChildren[3].style.display = "block";
        secondCardChildren[1].style.display = "none";
        resetCard();

    }, 700);
}

function resetCard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
})();

let moves = 0;

function addMove() {
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
}
if (hasFlippedCard.length === 2) {
 
}

function removeStars() {
    if (moves === 10 || moves === 20 || moves === 30) {
        removeStar();

    }
}

function removeStar() {
    let starsList = document.querySelectorAll('.stars li');
    for (stars of starsList) {
        if (stars.style.display !== 'none') {
            stars.style.display = 'none';
            break; //need to find out what break does 

        }
    }
}
removeStars();

//timer 
//let stopTimer = false;//need this for the timer and the reset 
let resetGame = true; //need this for game reset and modal 

let hour = 0;
let minute = 0;
let second = 0;

function restartGame() {
    if (timeStart) stopTimer();
    resetTimer();
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });

    shuffle();
    matchCount = 0;
    moves = 0;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
}

function showTimer() {
    let timer = document.querySelector('.timer');
    // let minutes = Math.floor(time / 60);
    // let seconds = Math.floor(time % 60);
    //console.log(timer);
    timer.innerHTML = minutes + ':' + seconds;
}

function startTimer() {
    if (resetGame == true) {
        let timer = 0;
        if (timeStart === "") {
            timeStart = setInterval(() => { //8-30 if i use => timer works, change it per https://www.w3schools.com/js/js_timing.asp it acts like it wants to start but doesnt
                ++timer;
                second = timer % 60;
                minute = Math.floor(timer / 60);
                if (minute < 10) minute = '0' + minute;
                if (second < 10) second = '0' + second;
                
                document.querySelector(".timer").innerHTML = minute + ':' + second;
                document.querySelector(".timer").innerHTML = minute + ':' + second;
                // if (stopTimer) {
                //     document.querySelector(".timer").innerHTML = "00:00";
                //     timer = 0;
                //     hour = 0;
                //     minute = 0;
                //     second = 0;
                //     return;
                // showTimer();
                // }
            }, 1000);
        }
    }
}

function resetTimer() {
    document.querySelector(".timer").innerHTML = '00:00';
    [hour,minute, second] = [0,0,0];
}

function stopTimer() {
    clearInterval(timeStart); //clearInterval needs to use the variable from the setInterval 
    timeStart = '';
}
//get modal element

let modal = document.getElementById('simpleModal');

//get close button 

let closeBtn = document.getElementsByClassName('closeBtn')[0];

//Listen for close click
closeBtn.addEventListener('click', closeModal);

//listen for outside click

window.addEventListener('click', outsideClick);

//function to open Modal
function openModal() {
    modal.style.display = 'block'; // this is rendered as a block level element 
}

//function to close Modal
function closeModal() {
    modal.style.display = 'none'; //element will not be displayed 
}
//function to close Modal if outside click
function outsideClick(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
}


//9-3 Goals for today 
//1. get the playAgain button to replay the game and not popup the Modal
//2. get the modal to popup when the game is done
//3. get the stats to show up on the modal 
//4. rePlay Game needs to be on the modal per rubric 
//5. need to put the reset button back on the game per rubric 




function displayStats() {
    //261 JS need to create HTML class 
    //     1.timer .timer 43 HTML
    let timeStat = document.querySelector('.timer'); //need to get the timer
    //     2.moves .moves 67 HTML 
    let movesStat = document.querySelector('.moves'); //need to get the moves 
    //   3.stars  .stars 70 HTML 
    let starsStat = document.querySelector('.stars'); //needs to count the remaining stars and show the output 
    //display clock time .clock 66 HTML
    let clockTime = document.querySelector('.clock'); //needs to display the clock 
    let stars = getStars(); //254 JS
    displayStats(); //245 JS
    // 
}


//shuffle();
cards.forEach(card => card.addEventListener('click', flipCard));
//stopTimer = true;