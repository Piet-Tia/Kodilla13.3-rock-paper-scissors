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

/* DODAWAC KLASY Z PRZEDROSTKIEM "JS-" NA POTRZEBY ODWOLYWANIA SIE DO NICH PRZEZ JS */


/* change to: GAME.PARAMETERS */
var params = {
  playerScore: 0,
  computerScore: 0,
  gameLength: 0,
  roundsPlayed: 0,
  roundNumber: 1,
  progress: [],
}

var choices = ["rock", "paper", "scissors"];


/*** FUNCTIONS ***/

function checkIfInputIsPositiveInteger(input){
  if (!isNaN(parseInt(input, 10)) && parseInt(input, 10) > 0) {
    return true;
  }

/* NIEPOTRZEBNY ELSE !!! */

//  else { 
//    return false; 
//  } 
return false;
}




function newGame() {
  resetGame();
  (function askForGameLength() {
    params.gameLength = parseInt(prompt("How many won rounds should a game last?"),10);
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
    let playerChoice = this.id === "rock" ? 0 : this.id === "paper" ? 1 : 2; /* pomyśleć nad tym, ale jest ok*/
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
        return "You won. You played " + choices[playerChoice] + ", the computer played " + choices[computerChoice] + ".";
      }
    }
    addTextNoBreak("output" , "Round " + params.roundNumber + ": ");
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

function addTextNoBreak(location,text) { /* jedna moze korzystac z drugiej */
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
  console.log ("computerWon:" , params.computerScore , params.gameLength);
  if (params.computerScore == params.gameLength) {
    return true;
  }
return false;
}

/* Czy da sie to zapisac przy pomocy "blabla ? a : b" */

function playerWon() {
  return params.playerScore === params.gameLength;
}

/*function playerWon() {
  if (params.playerScore == params.gameLength) {
    return true;
  }
  else {
    return false;
  } 
}
*/

/*
if (!a.length) {}
=
if (a.length === 0) {}
*/

function postResult() {
  updateScoreBoard();
  console.log("postResult" , computerWon(), playerWon());
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
      addText("content", "<br>Please start a new game.");
    }, 1000);
  }
}

function showModal(modalClass) { /*argument jest niewykorzystywany, ale f() dziala :)*/
  DOM.modalOverlay.classList.add('show');
  DOM.modalClass.classList.add('show');
};

function hideModal() {
  DOM.modalOverlay.classList.remove('show');
};

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


/*** EVENTS ***/


DOM.newGameButton.addEventListener("click", newGame);

for (var i = 0; i < DOM.closeButtons.length; i++) {
  DOM.closeButtons[i].addEventListener('click', hideModal);
}

DOM.modalOverlay.addEventListener('click', hideModal);

DOM.modalClass.addEventListener('click', function(event){
  event.stopPropagation();
  });


/*** OTHER ***/


for (x = 0; x < 3; x++) {
  DOM.gameButtons[x].disabled = true;
}


