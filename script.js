//computerSelection
function getComputerChoice() {
    let randomNumber = Math.floor(Math.random() * 3) + 1;
    switch(randomNumber) {
        case (1):
            return ("rock");
        case (2):
            return ("paper");
        case (3):
            return ("scissors");
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
            case ("scissors"):
                return ("You Win! Rock crushes Scissors.")
        }
    } else if (playerSelection === "paper") {
        switch (computerSelection) {
            case ("rock"):
                return ("You Win! Paper beats Rock.");
            case ("scissors"):
                return ("You Lose! Scissors cuts Paper.")
        }
    } else if (playerSelection === "scissors") {
        switch (computerSelection) {
            case ("rock"):
                return ("You Lose! Rock crushes Rock.");
            case ("paper"):
                return ("You Win! Scissor cuts paper.")
        }
    } else {
        return ("Wrong input! You can only enter 'rock', 'paper' and 'scissor'. Don't worry about the case.");
    }
}

//change background color of selected element
function styleSelection(playerSelection, computerSelection) {   
    const BLUE = "rgb(61, 61, 228)";
    const GREEN = "rgba(43, 255, 0, 0.884)";
    let computerSelections = Array.from(document.querySelectorAll(".computerSelection"));
    let playerSelections = Array.from(document.querySelectorAll(".playerSelection"));

    computerSelections.forEach(selection => selection.style.backgroundColor = "");
    playerSelections.forEach(selection => selection.style.backgroundColor = "");

    playerSelection.style.backgroundColor = GREEN;
    computerSelections.forEach(selection => {
        if (selection.classList[1] === computerSelection) selection.style.backgroundColor = BLUE;
    });
}
//add div for message
function appendMessage(playerSelection, computerSelection) {
    const messageDiv = document.createElement('div');
    let children = Array.from(document.body.children);
    children.forEach(child => {
        if (child.classList.value === 'message') document.body.removeChild(child)
    });
    messageDiv.classList.add('message');
    let message = String(playRound(playerSelection.classList[1], computerSelection));
    let text = document.createTextNode(message);
    let footer = document.querySelector('footer');

    messageDiv.style.cssText = "text-align: center; margin: 5px 0px;";
    messageDiv.appendChild(text);
    document.body.insertBefore(messageDiv, footer);

    return message;
}
//pass player selection for other functions
function passSelection(event) {
    let computerSelection = getComputerChoice();
    styleSelection(event.target, computerSelection);
    //get return value
    const message = appendMessage(event.target, computerSelection);
    event.stopPropagation();
}

//start the game
function startGame() {
    const selections = Array.from(document.querySelectorAll(".playerSelection"));
    selections.forEach(selection => selection.addEventListener('click', passSelection));
}

startGame();