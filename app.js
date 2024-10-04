let gameSeq = [];
let userSeq = [];
let level = 0;
let started = false;
let h3 = document.querySelector("h3");
let btns = ["one", "two", "three", "four"];
let highScore = localStorage.getItem('highScore') || 0;
document.getElementById('high-score').innerText = `High Score : ${highScore}`;

let startButton = document.getElementById('startButton');

function startGame() {
    if (!started) {
        console.log("Game Started !!");
        started = true;
        startButton.style.display = 'none'; // Hides the start button
        h3.innerText = "Get Ready!";
        setTimeout(() => {
            levelUp();
        }, 1000); // Delay the start by 1 sec
    }
}

startButton.addEventListener('click', startGame);

document.addEventListener("keypress", function(event) {
    if (!started && document.activeElement === document.body) {
        startGame();
    }
});

function levelUp() {
    userSeq = [];
    level++;
    h3.innerText = `Level : ${level}`;
    let randomIdx = Math.floor(Math.random() * 4);
    let randBox = btns[randomIdx];
    let randBtn = document.querySelector(`.${randBox}`);
    gameSeq.push(randBox);
    gameFlash(randBtn);
}

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function() {
        btn.classList.remove("userFlash");
    }, 250);
}

function btnPress() {
    if (!started) return; 
    let btn = this;
    userFlash(btn);
    
    let userBox = btn.getAttribute("id");
    userSeq.push(userBox);
    
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function checkAns(idx) {
    console.log(`Current Level : ${level}`);
    if (userSeq[idx] == gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
        console.log("Matched!!");
    } else {
        gameOver();
    }
}

function gameOver() {
    if (level > highScore) {
        highScore = level;
        localStorage.setItem('highScore', highScore);
        document.getElementById('high-score').innerText = `High Score : ${highScore}`;
    }
    h3.innerHTML = `GAME OVER! Your score was :  <b>${level}</b> <br> Press Start Game to play again...`;
    console.log("Game Over!");
    let shakeDuration = 500;
    let shakeInterval = setInterval(() => {
        document.querySelector("body").classList.toggle("shake");
    }, 100);
    
    setTimeout(() => {
        clearInterval(shakeInterval);
        document.querySelector("body").classList.remove("shake");
    }, shakeDuration);
    
    reset();
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    startButton.style.display = 'inline-block'; // Show the start button again
}

function restartGame() {
    if (started) {
        gameOver();
    }
    h3.innerText = "Press Start Game to play";
    console.log("Game Restarted");
    
    this.blur();
    document.body.focus();
}

let res = document.querySelector(".restart");
res.addEventListener("click", restartGame);

// Ensure the body is in focus
document.body.tabIndex = -1;