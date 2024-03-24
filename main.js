function getRandomIntInclusive(min, max) {
    const minCeil = Math.ceil(min);
    const maxFloor = Math.floor(max);

    return Math.floor(Math.random() * (maxFloor - minCeil + 1) + minCeil);
}

function getComputerChoice() {
    const choice = getRandomIntInclusive(0, 2);

    switch (choice) {
        case 0: {
            return "rock";
        }
        case 1: {
            return "paper";
        }
        case 2: {
            return "scissors";
        }
        default: {
            return "Invalid number";
        }
    }
}

function playRound(computerChoice, playerChoice) {
    if (playerChoice === null) {
        return "Invalid choice for player!";
    }

    computerChoice = computerChoice.toLowerCase();
    playerChoice = playerChoice.toLowerCase();

    let result =
        `Computer Choice: ${computerChoice}
Player Choice: ${playerChoice}`;

    if (!["scissors", "rock", "paper"].includes(playerChoice) ||
        !["scissors", "rock", "paper"].includes(computerChoice)) {
        return result + "\nInvalid choice!"
    }

    if (computerChoice === playerChoice) {
        return result + "\nResult: Tie!";
    } else if ((computerChoice === "scissors" && playerChoice === "rock") ||
        (computerChoice === "paper" && playerChoice === "scissors") ||
        (computerChoice === "rock" && playerChoice === "paper")) {
        return result + "\nResult: Player Wins!";
    } else {
        return result + "\nResult: Computer Wins!";
    }
}

function playGame() {
    let playerScore = 0;
    let computerScore = 0;

    while (playerScore !== 3 && computerScore !== 3) {
        let playerChoice = prompt("Please choose between \"Rock\", \"Paper\" or \"Scissors\": ");
        let computerChoice = getComputerChoice();

        result = playRound(computerChoice, playerChoice)

        console.log(result);

        if (result.includes("Player Wins")) {
            playerScore++;
        } else if (result.includes("Computer Wins")) {
            computerScore++;
        }

        console.log(`Current Standings
        Player: ${playerScore}
        Computer: ${computerScore}`)
    }

    if (playerScore === 3) {
        return "Player";
    }

    return "Computer";
}

console.log(playGame() + " wins!");
