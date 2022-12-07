//colors
const BLUE = "rgb(61, 61, 228)";
const GREEN = "rgba(43, 255, 0, 0.884)";
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
//replace child of body
function replaceContainer(playerScore, computerScore) {
    const body = document.body;
    const container = document.querySelector('.container');
    const player = document.querySelector('.player');
    const selections = Array.from(document.querySelectorAll('.selections'));

    //add button
    const button = document.createElement('button');
    button.textContent = "Play Again!";
    button.style.cssText= `background-color: GREEN; color: white; font-size: 24px;
                        border-radius: 10px; text-align: center;
                        height: 50px; max-width: 150px;
                        margin: 0 auto 30px; padding: 5px 10px;`;
    player.style.cssText = 'margin: auto; min-width: 300px; max-height: 300px';
    body.replaceChild(player, container);
    player.removeChild(player.children[2]);
    player.replaceChild(button, selections[0]);
    button.addEventListener('click', () => {
        window.open("./index.html", "_parent");
    });

    const message = document.createElement("p");
    message.style.cssText = "font-weight: bold; font-weight: 20px; text-align: center;";
    if (playerScore === 5) {
        message.textContent = "You Win!";
        player.insertBefore(message, player.children[2]);
    } else {
        message.textContent = "You Lose!";
        player.insertBefore(message, player.children[2]);
    }
}
//add score and append elements
function addScore(message, target) {
    let playerScore, computerScore, score;
    let messageArray = message.split(" ");
    //get elements
    const player = document.querySelector(".playerScore");
    const computer = document.querySelector(".computerScore");  
    //check if each elements has childNode
    if (!player.hasChildNodes() && !computer.hasChildNodes()) {
        playerScore = 0;
        computerScore = 0;
    }
    //get previous scores and remove them
    if (player.textContent) {
        playerScore = +player.textContent;
        player.replaceChildren();
    }
    if (computer.textContent) {
        computerScore = +computer.textContent;
        computer.replaceChildren();
    }
    //add a score to previous scores
    if (messageArray.includes("Win!")) {
        playerScore += 1;
    } else if (messageArray.includes("Lose!")) {
        computerScore += 1;
    }
    //
    if (playerScore === 5 || computerScore === 5) {
        replaceContainer(playerScore, computerScore);
    }
    //create text_node and append to elements
    const playerText = document.createTextNode(`${playerScore}`);
    const computerText = document.createTextNode(`${computerScore}`);
    player.appendChild(playerText);
    computer.appendChild(computerText);
}
//pass player selection for other functions
function passSelection(event) {
    let computerSelection = getComputerChoice();
    styleSelection(event.target, computerSelection);
    //get return value
    const message = appendMessage(event.target, computerSelection);
    addScore(message, event.target);
    event.stopPropagation();
}

//start the game
function startGame() {
    const selections = Array.from(document.querySelectorAll(".playerSelection"));
    selections.forEach(selection => selection.addEventListener('click', passSelection));
}

startGame();