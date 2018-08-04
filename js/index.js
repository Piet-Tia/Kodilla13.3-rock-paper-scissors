var DOM = {
  gameButtons: document.getElementsByClassName("game_button"),
  LengthOfGameInfo: document.getElementById("game_length_info"),
  output: document.getElementById("output"),
  playerScore: document.getElementById("player_score"),
  computerScore: document.getElementById("computer_score"),
  newGameButton: document.getElementById("new-game-button"),
}

var params = {
  playerScore: 0,
  computerScore: 0,
  gameLength: 0,
  roundsPlayed: 0,
  buttonsActive: false,
  gameEnded: false,

}

for (x = 0; x < 3; x++) {
  DOM.gameButtons[x].disabled = true;
}

DOM.newGameButton.addEventListener("click", newGame);

function newGame() {
  resetGame();
  (function askForGameLength() {
    params.gameLength = prompt("How many won rounds should a game last?");
    console.log(params.gameLength);
    if (!isNaN(parseInt(params.gameLength, 10)) && parseInt(params.gameLength, 10) > 0) {
      DOM.LengthOfGameInfo.innerHTML =
        "The game lasts until " +
        params.gameLength +
        " round" +
        (params.gameLength == 1 ? " is" : "s are") +
        " won.<br>";
    } else if (params.gameLength == null) {} 
    else {
      return askForGameLength();
    }
  })();
}

function randomChoice() {
  return Math.floor(Math.random() * 3);
}

function displayText(text) {
  DOM.output.innerHTML += text + "<br>";
}

function resetGame() {
  for (x = 0; x < 3; x++) {
    DOM.gameButtons[x].disabled = false;
  }
  params.playerScore = params.computerScore = 0;
  DOM.playerScore.innerHTML = params.playerScore;
  DOM.computerScore.innerHTML = params.computerScore;
  DOM.output.innerHTML = "";
}

function postResult() {
  DOM.playerScore.innerHTML = params.playerScore;
  DOM.computerScore.innerHTML = params.computerScore;
  if (params.playerScore == params.gameLength || params.computerScore == params.gameLength) {
    for (x = 0; x < 3; x++) {
      DOM.gameButtons[x].disabled = true;
    }
    displayText(
      "<strong>" +
        (params.playerScore == params.gameLength ? "CONGRATULATIONS, " : "") +
        "YOU" +
        (params.playerScore == params.gameLength ? "" : "R OPPONENT") +
        " WON " +
        params.gameLength +
        " ROUND" +
        (params.gameLength == 1 ? "" : "S") +
        ". GAME OVER.</strong>"
    );
    setTimeout(function() {
      displayText("Please press the New Game button");
    }, 2000);
  }
}

Array.from(DOM.gameButtons).forEach(function(element) {
  element.addEventListener("click", function() {
    let playerChoice = this.id == "rock" ? 0 : this.id == "paper" ? 1 : 2;
    let computerChoice = randomChoice();
    let clickedButton = this.id;
    let whoWon =
      playerChoice === computerChoice
        ? "Tie. You both played " + clickedButton + "."
        : computerChoice - playerChoice == 1 ||
          computerChoice - playerChoice == -2
          ? (params.computerScore++,
            "Computer won. You played " +
              clickedButton +
              ", the computer played " +
              (playerChoice == 0
                ? "paper."
                : playerChoice == 1 ? "scissors." : "rock."))
          : (params.playerScore++,
            "You won. You played " +
              clickedButton +
              ", the computer played " +
              (playerChoice == 0
                ? "scissors."
                : playerChoice == 1 ? "rock." : "paper."));
    displayText(whoWon);
    postResult();
  });
});

var showModal = function(event){
  event.preventDefault();
  document.querySelector('#modal-overlay').classList.add('show');
};