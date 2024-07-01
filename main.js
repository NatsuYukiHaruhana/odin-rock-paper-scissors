function getRandomIntInclusive(min, max) {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);

  return Math.floor(Math.random() * (maxFloor - minCeil + 1) + minCeil);
}

const choices = Object.freeze({
  ROCK: 0,
  PAPER: 1,
  SCISSORS: 2,
  NULL: 3,
});

function getComputerChoice() {
  const choice = getRandomIntInclusive(0, 2);

  return choice;
}

const maxScore = 5;
let playerScore = 0;
let computerScore = 0;

function calculateRoundResults(computerChoice, playerChoice) {
  if (computerChoice === playerChoice) {
    return 0; // tie
  }

  if (
    (computerChoice === choices.SCISSORS && playerChoice === choices.ROCK) ||
    (computerChoice === choices.PAPER && playerChoice === choices.SCISSORS) ||
    (computerChoice === choices.ROCK && playerChoice === choices.PAPER)
  ) {
    return 1; // player won
  }

  return -1; // player lost
}

function doRound(e) {
  let playerChoice = null;

  switch (e.target.parentNode.id) {
    case "rock": {
      playerChoice = choices.ROCK;
      break;
    }

    case "paper": {
      playerChoice = choices.PAPER;
      break;
    }

    case "scissors": {
      playerChoice = choices.SCISSORS;
      break;
    }
  }

  const computerChoice = getComputerChoice();

  const result = calculateRoundResults(computerChoice, playerChoice);

  playAnimation(playerChoice, computerChoice, result);
}

function enableButtons() {
  buttons.forEach((button) => {
    button.style.pointerEvents = "auto";
    button.style.cursor = "pointer";
    button.style.display = "flex";
  });
}

function disableButtons(hide = false) {
  buttons.forEach((button) => {
    button.style.pointerEvents = "none";
    button.style.cursor = "default";

    if (hide === true) {
      button.style.display = "none";
    }
  });
}

function resetPlayingField(score) {
  score.remove();
  const choiceImgs = document.querySelectorAll(".animation-img");
  choiceImgs.forEach((choiceImg) => {
    choiceImg.remove();
  });
  enableButtons();
}

function computeState(result) {
  if (result != 0) {
    if (result == 1) {
      playerScore++;
      const textToModify = document.querySelector("#human > .player-score");
      textToModify.textContent = playerScore;
    } else {
      computerScore++;
      const textToModify = document.querySelector("#computer > .player-score");
      textToModify.textContent = computerScore;
    }

    if (playerScore === maxScore) {
      resultsText.textContent = "You Win!";
      resultsText.style.color = "green";
      doGameOver();
    } else if (computerScore === maxScore) {
      resultsText.textContent = "Computer Wins!";
      resultsText.style.color = "red";
      doGameOver();
    }
  }
}

function doDecisionAnimation(winner, result) {
  const score = document.createElement("div");
  score.textContent = "+1";
  score.style.opacity = 0;
  score.classList.add("player-score");

  var playerDiv = null;
  if (winner === "Player") {
    playerDiv = document.querySelector("#human");
  } else if (winner === "Computer") {
    playerDiv = document.querySelector("#computer");
  }

  if (playerDiv === null) {
    resetPlayingField(score);
    return;
  }
  playerDiv.appendChild(score);

  var transparency = 0;
  const timer = setInterval(() => {
    transparency += 0.05;
    score.style.opacity = transparency;
    if (transparency >= 1) {
      clearInterval(timer);
      resetPlayingField(score);
      computeState(result);
    }
  }, 25);
}

function doMoveAnimation(choice, isPlayer, result) {
  const choiceImg = document.createElement("img");
  switch (choice) {
    case choices.ROCK: {
      choiceImg.src = "./res/Rock.svg";
      break;
    }
    case choices.PAPER: {
      choiceImg.src = "./res/Paper.svg";
      break;
    }
    case choices.SCISSORS: {
      choiceImg.src = "./res/Scissors.svg";
      break;
    }
  }

  choiceImg.classList.add("animation-img");
  choiceImg.classList.add("filter-black");
  gameElement.appendChild(choiceImg);
  let pos = 0;

  const timer = setInterval(() => {
    pos += 1.5;
    if (isPlayer === false) {
      choiceImg.style.marginLeft = pos + "%";
    } else {
      choiceImg.style.marginRight = pos + "%";
    }
    if (pos >= 75) {
      clearInterval(timer);

      if (isPlayer === true) {
        if (result === 1) {
          doDecisionAnimation("Player", result);
        } else if (result === -1) {
          doDecisionAnimation("Computer", result);
        } else {
          doDecisionAnimation("", result);
        }
      }
    }
  }, 25);
}

function playAnimation(playerChoice, computerChoice, result) {
  disableButtons(true);

  doMoveAnimation(playerChoice, true, result);

  doMoveAnimation(computerChoice, false, result);
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;

  enableButtons();

  const scores = document.querySelectorAll(".player-score");

  scores.forEach((score) => {
    score.textContent = "0";
  });

  resultsText.remove();
  playAgainButton.remove();
}

function doGameOver() {
  disableButtons();

  gameElement.appendChild(resultsText);
  gameElement.appendChild(playAgainButton);
}

const buttons = document.querySelectorAll("#buttons");
const gameElement = document.querySelector("#game");

const resultsText = document.createElement("div");
resultsText.style.fontSize = "36px";

const playAgainButton = document.createElement("button");
playAgainButton.textContent = "Play Again!";
playAgainButton.style.cursor = "pointer";

playAgainButton.addEventListener("click", resetGame);

buttons.forEach((button) => {
  button.addEventListener("click", doRound);
});
