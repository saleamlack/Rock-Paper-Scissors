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

//game() plays five rounds and return the winner;
function game() {
    let playerScore = 0;
    let computerScore = 0;

    for (let i = 0; i < 5; i++) {
        const computerSelection = getComputerChoice();
        const playerSelection = prompt("Ro-Sham-Bo");

        if (playerSelection) {
            console.log(`You: ${playerSelection}    computer: ${computerSelection}`);
        } else if (playerSelection === null) {
            console.log("You quit the game!");
            return;
        }
        
        const gameMessage = playRound(playerSelection, computerSelection);

        if (gameMessage.includes("Win")) {
            playerScore += 1;
            console.log(`${gameMessage}\nRound ${i + 1}>> player: ${playerScore}  computer: ${computerScore}`);
        } else if (gameMessage.includes("Lose")) {
            computerScore += 1;
            console.log(`${gameMessage}\nRound ${i + 1}>> player: ${playerScore}  computer: ${computerScore}`);
        } else {
            console.log(gameMessage);
            i -= 1;
        }
    }

    console.log(`Player: ${playerScore}    Computer: ${computerScore}`);
    if (playerScore > computerScore) {
        console.log(`You Win!`);
    } else {
        console.log(`You lose!`);
    }
}

game();