//computerSelection
function getComputerChoice() {
    let randomNumber = Math.floor(Math.random() * 3) + 1;
    switch(randomNumber) {
        case (1):
            return ("rock");
        case (2):
            return ("paper");
        case (3):
            return ("scissor");
    }
}

//A function that plays a single round
function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();

    if (playerSelection === computerSelection) {
        return (`Both of you play ${playerSelection}. Please, Try again.`);
    } else if (playerSelection === "rock") {
        switch (computerSelection) {
            case ("paper"):
                return ("You Lose! Paper beats Rock.");
            case ("scissor"):
                return ("You Win! Rock crushes Scissors.")
        }
    } else if (playerSelection === "paper") {
        switch (computerSelection) {
            case ("rock"):
                return ("You Win! Paper beats Rock.");
            case ("scissor"):
                return ("You Lose! Scissors cuts Paper.")
        }
    } else if (playerSelection === "scissor") {
        switch (computerSelection) {
            case ("rock"):
                return ("You Lose! Rock crushes Rock.");
            case ("Paper"):
                return ("You Win! Scissor cuts paper.")
        }
    } else {
        return ("Wrong input! You can only enter 'rock', 'paper' and 'scissor'. Don't worry about the case.");
    }
}

