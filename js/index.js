var DOM = {
  gameButtons: document.getElementsByClassName("game_button"),
  lengthOfGameInfo: document.getElementById("game_length_info"),
  output: document.getElementById("output"),
  playerScore: document.getElementById("player_score"),
  computerScore: document.getElementById("computer_score"),
  newGameButton: document.getElementById("new-game-button"),

/* TU SIE ZACZYNAJA QUERY SELECTORY - CZY LEPIEJ PRZEROBIC NA TAK JAK WYZEJ ? */

  content: document.querySelector('.content'),
  gameSummary: document.querySelector('.game-summary'),
  modalOverlay: document.querySelector('#modal-overlay'),
  modalClass: document.querySelector('.modal'),
  closeButtons: document.querySelectorAll('.modal .close'),

}

var params = {
  playerScore: 0,
  computerScore: 0,
  gameLength: 0,
  roundsPlayed: 0,
  roundNumber: 1,
  progress: [],
}

var choices = ["rock", "paper", "scissors"];


function checkIfInputIsPositiveInteger(input){
  if (!isNaN(parseInt(input, 10)) && parseInt(input, 10) > 0) {
    return true;
  }
  else {
    return false;
  } 
}

function newGame() {
  resetGame();
  (function askForGameLength() {
    params.gameLength = prompt("How many won rounds should a game last?");
    if (checkIfInputIsPositiveInteger(params.gameLength)) {
      displayText("lengthOfGameInfo", ("The game lasts until " + params.gameLength + " round" + (params.gameLength == 1 ? " is" : "s are") + " won.<br>"));
    } else if (params.gameLength == null) {
      return;
     }
    else {
      return askForGameLength();
    }
  })();
}

function resetGame() {
  for (x = 0; x < 3; x++) {
    DOM.gameButtons[x].disabled = false;
  }
  params.roundNumber = 1;
  params.playerScore = params.computerScore = 0;
  params.progress = [];
  updateScoreBoard();
  displayText("output" , "");
  displayText("gameSummary" , "");
}

Array.from(DOM.gameButtons).forEach(function (element) {
  element.addEventListener("click", function () {
    let playerChoice = this.id == "rock" ? 0 : this.id == "paper" ? 1 : 2;
    let computerChoice = randomChoice();
    let roundResult;
    let whoWon = function () {
      if (playerChoice === computerChoice) {
        roundResult = "Tie."
        return ("Tie. You both played " + choices[playerChoice] + ".");
      }
      else if (computerChoice - playerChoice == 1 || computerChoice - playerChoice == -2) {
        params.computerScore++;
        roundResult = "Computer won."
        return "Computer won. You played " + choices[playerChoice] + ", the computer played " + choices[computerChoice] + ".";
      }
      else {
        params.playerScore++;
        roundResult = "Player won."
        return "You won. You played " + choices[playerChoice] + ", the computer played " + choices[computerChoice];
      }
    }
    addText("output", whoWon());
    let roundStats = {
      numberOfRound: params.roundNumber,
      moveOfPlayer: choices[playerChoice],
      moveOfComputer: choices[computerChoice],
      resultOfRound: roundResult,
      scoreAfterRound: params.playerScore + " : " + params.computerScore,
    };
    params.progress.push(roundStats);
    console.log(params.progress);
    params.roundNumber++;
    postResult();
  });
});

function randomChoice() {
  return Math.floor(Math.random() * 3);
}

function addText(location,text) {
  DOM[location].innerHTML += text + "<br>";
}

function addTextNoBreak(location,text) {
  DOM[location].innerHTML += text;
}

function displayText(location,text) {
  DOM[location].innerHTML = text;
}

function updateScoreBoard() {
  displayText("playerScore" , params.playerScore);
  displayText("computerScore", params.computerScore);
}

function computerWon() {
  if (params.computerScore == params.gameLength) {
    return true;
  }
  else {
    return false;
  } 
}

/* Czy da sie to zapisac przy pomocy "blabla ? a : b" */

function playerWon() {
  if (params.playerScore == params.gameLength) {
    return true;
  }
  else {
    return false;
  } 
}

function postResult() {
  updateScoreBoard();
  if (playerWon() || computerWon() ) {
    for (x = 0; x < 3; x++) {
      DOM.gameButtons[x].disabled = true;
    }
    insertGameStats();
    showModal(".modal");
    displayText("content" , 
      "<strong>" +
      (playerWon() ? "CONGRATULATIONS, YOU WON " : "YOUR OPPONENT WON ") +  params.gameLength + " ROUND" + (params.gameLength == 1 ? "" : "S") + ".</strong>"
    );
    setTimeout(function () {
      addText("content", "<br>Please press the New Game button.");
    }, 1000);
  }
}

function showModal(modalClass) {
  DOM.modalOverlay.classList.add('show');
  DOM.modalClass.classList.add('show');
};

function hideModal() {
  DOM.modalOverlay.classList.remove('show');
};

for (x = 0; x < 3; x++) {
  DOM.gameButtons[x].disabled = true;
}

DOM.newGameButton.addEventListener("click", newGame);

for (var i = 0; i < DOM.closeButtons.length; i++) {
  DOM.closeButtons[i].addEventListener('click', hideModal);
}



function insertGameStats() {
  addTextNoBreak("gameSummary" , "<tr><th>No. of round</th><th>Move of Player</th><th>Move of Computer</th><th>Result of round</th><th>Score after round</th></tr>");
  for (i=0 ; i<params.progress.length ; i++) {
    addTextNoBreak("gameSummary" , "<tr><td>" + 
    params.progress[i]['numberOfRound'] + "</td><td>" + 
    params.progress[i]['moveOfPlayer'] + "</td><td>" + 
    params.progress[i]['moveOfComputer'] + "</td><td>" +
    params.progress[i]['resultOfRound'] + "</td><td>" +
    params.progress[i]['scoreAfterRound'] + "</td></tr>");
  }
}

