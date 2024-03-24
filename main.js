function getRandomIntInclusive(min, max) {
    const minCeil = Math.ceil(min);
    const maxFloor = Math.floor(max);

    return Math.floor(Math.random() * (maxFloor - minCeil + 1) + minCeil);
}

function getComputerChoice() {
    const choice = getRandomIntInclusive(0, 2);

    switch (choice) {
        case 0: {
            return "Rock";
        }
        case 1: {
            return "Paper";
        }
        case 2: {
            return "Scissors";
        }
        default: {
            return "Invalid number";
        }
    }
}