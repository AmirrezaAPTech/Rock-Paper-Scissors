const userMove = "";
const picks = ["Rock", "Scissors", "Paper"];

const rockBtn = document.querySelector(".rock-btn");
rockBtn.addEventListener("click", () => playGame("Rock"));
const paperBtn = document.querySelector(".paper-btn");
paperBtn.addEventListener("click", () => playGame("Paper"));
const scissorsBtn = document.querySelector(".scissors-btn");
scissorsBtn.addEventListener("click", () => playGame("Scissors"));
let resault = "";
// let computerMove = '';
const score = JSON.parse(localStorage.getItem("score")) || {
  Wins: 0,
  Losses: 0,
  Ties: 0,
};

function randomPicks() {
  const randomNumber = Math.floor(Math.random() * picks.length);
  return picks[randomNumber];
}

let isAutoPlaying = false;
let intervalId;
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = randomPicks();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

function playGame(userMove) {
  computerMove = randomPicks();
  if (userMove === "Rock") {
    if (computerMove === "Scissors") {
      resault = "You Won!";
      score.Wins++;
    } else if (computerMove === "Paper") {
      resault = "You Lost!";
      score.Losses++;
    } else if (computerMove === "Rock") {
      resault = "Tied !";
      score.Ties++;
    }
  }
  if (userMove === "Scissors") {
    if (computerMove === "Scissors") {
      resault = "Tied !";
      score.Ties++;
    } else if (computerMove === "Paper") {
      resault = "You Won!";
      score.Wins++;
    } else if (computerMove === "Rock") {
      resault = "You Lost!";
      score.Losses++;
    }
  }
  if (userMove === "Paper") {
    if (computerMove === "Scissors") {
      resault = "You Lost!";
      score.Losses++;
    } else if (computerMove === "Paper") {
      resault = "Tied !";
      score.Ties++;
    } else if (computerMove === "Rock") {
      resault = "You Won!";
      score.Wins++;
    }
    localStorage.setItem("score", JSON.stringify(score));
  }

  let resaultContainer = document.querySelector(".resault");
  resaultContainer.innerHTML = `${resault}`;
  let moves = document.querySelector(".moves");
  moves.innerHTML = ` You <img src="/Img/${userMove}-emoji.png"> <img src="/Img/${computerMove}-emoji.png"> Computer </p>`;

  updateScoreElement();
}

function updateScoreElement() {
  let scoreList = document.querySelector(".score");
  scoreList.innerHTML = `<p>Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Ties} </p>`;
}

const reset = document.querySelector(".reset-btn");
reset.addEventListener("click", () => {
  score.Wins = 0;
  score.Losses = 0;
  score.Ties = 0;
  localStorage.removeItem("score");
  updateScoreElement();
});
