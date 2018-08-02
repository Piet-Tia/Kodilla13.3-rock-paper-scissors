var playerScore = 0;
var computerScore = 0;
var gameLength;
var gameLengthElement = document.getElementById("game_length");
var outputElement = document.getElementById("output");
var playerScoreElement = document.getElementById("player_score");
var computerScoreElement = document.getElementById("computer_score");
var gameButtonElements = document.getElementsByClassName("game_button");
var rockElement = document.getElementById("rock");
var paperElement = document.getElementById("paper");
var scissorsElement = document.getElementById("scissors");
var newGameButtonElement = document.getElementById("new-game-button");

for (x = 0; x < 3; x++) {
  gameButtonElements[x].disabled = true;
}

/*
var DOM = {
 gameLength: document.getElementById("game_length"),
 output: document.getElementById("output"),
 playerScore: document.getElementById("player_score"),
 computerScore: document.getElementById("computer_score"),
 gameButton: document.getElementsByClassName("game_button"),
 rock: document.getElementById("rock"),
 paper: document.getElementById("paper"),
 scissors: document.getElementById("scissors"),
 newGameButton: document.getElementById("new-game-button"),
}

var gameStats = {
  playerScore: 0,
  computerScore: 0,
  gameLength: 0,
}
*/

function newGame() {
  resetGame();
  (function askForGameLength() {
    gameLength = prompt("How many won rounds should a game last?");
    console.log(gameLength);
    if (!isNaN(parseInt(gameLength, 10)) && parseInt(gameLength, 10) > 0) {
      gameLengthElement.innerHTML =
        "The game lasts until " +
        gameLength +
        " round" +
        (gameLength == 1 ? " is" : "s are") +
        " won.<br>";
    } else if (gameLength == null) {} 
    else {
      return askForGameLength();
    }
  })();
}

function randomChoice() {
  return Math.floor(Math.random() * 3);
}

function displayText(text) {
  outputElement.innerHTML += text + "<br>";
}

function resetGame() {
  for (x = 0; x < 3; x++) {
    gameButtonElements[x].disabled = false;
  }
  playerScore = computerScore = 0;
  playerScoreElement.innerHTML = playerScore;
  computerScoreElement.innerHTML = computerScore;
  outputElement.innerHTML = "";
}

/* OLD VERSION OF POSTRESULT
 
function postResult() {
  playerScoreElement.innerHTML = playerScore;
  computerScoreElement.innerHTML = computerScore;
  if (playerScore == gameLength) {
    for (x=0 ; x <3 ; x++){
      gameButtonElements[x].disabled = true;
    };
    displayText('<strong>CONGRATULATIONS, YOU WON ' + gameLength + ' ROUND' + (gameLength == 1 ? '' : 'S') + '. GAME OVER.');
    setTimeout(function(){
      displayText('Please press the New Game button');
    },2000);
  }
  else if (computerScore == gameLength) {
    for (x=0 ; x <3 ; x++){
      gameButtonElements[x].disabled = true;
    };
    displayText('<strong>GAME OVER. YOUR OPONENT WON ' + gameLength + ' ROUND' + (gameLength == 1 ? '' : 'S') + '.');
    setTimeout(function(){
      displayText('Please press the New Game button');
    },2000);
  }
  */

function postResult() {
  playerScoreElement.innerHTML = playerScore;
  computerScoreElement.innerHTML = computerScore;
  if (playerScore == gameLength || computerScore == gameLength) {
    for (x = 0; x < 3; x++) {
      gameButtonElements[x].disabled = true;
    }
    displayText(
      "<strong>" +
        (playerScore == gameLength ? "CONGRATULATIONS, " : "") +
        "YOU" +
        (playerScore == gameLength ? "" : "R OPPONENT") +
        " WON " +
        gameLength +
        " ROUND" +
        (gameLength == 1 ? "" : "S") +
        ". GAME OVER.</strong>"
    );
    setTimeout(function() {
      displayText("Please press the New Game button");
    }, 2000);
  }
}

/* PRZEROBIC NA FUNKCJE PLAYER, FUNKCJE COMPUTER I FUNKCJE POROWNANIE -> WYNIK */
/*
OLD VERSION OF BUTTON CLICKS

rockElement.addEventListener('click', function(){
  switch(randomChoice()){
    case 0:
      displayText('TIE: you played ROCK, computer played ROCK');
      break;
    case 1:
      displayText('COMPUTER WON: you played ROCK, computer played PAPER');
      computerScore++;
      break;
    case 2:
      displayText('YOU WON: you played ROCK, computer played SCISSORS');
      playerScore++;
      break;
    }
  postResult();
  });

paperElement.addEventListener('click', function(){
  switch(randomChoice()){
    case 0:
      displayText('YOU WON: you played PAPER, computer played ROCK');
      playerScore++;
      break;
    case 1:
      displayText('TIE: you played PAPER, computer played PAPER');
      break;
    case 2:
      displayText('COMPUTER WON: you played PAPER, computer played SCISSORS');
      computerScore++;
      break;
    }
  postResult();
  });

scissorsElement.addEventListener('click', function(){
  switch(randomChoice()){
    case 0:
      displayText('COMPUTER WON: you played SCISSORS, computer played ROCK');
      computerScore++;
      break;
    case 1:
      displayText('YOU WON: you played SCISSORS, computer played PAPER');
      playerScore++;
      break;
    case 2:
      displayText('TIE: you played SCISSORS, computer played SCISSORS');
      break;
    };
  postResult();
});
*/

Array.from(gameButtonElements).forEach(function(element) {
  element.addEventListener("click", function() {
    let playerChoice = this.id == "rock" ? 0 : this.id == "paper" ? 1 : 2;
    let computerChoice = randomChoice();
    let clickedButton = this.id;
    let whoWon =
      playerChoice === computerChoice
        ? "Tie. You both played " + clickedButton + "."
        : computerChoice - playerChoice == 1 ||
          computerChoice - playerChoice == -2
          ? (computerScore++,
            "Computer won. You played " +
              clickedButton +
              ", the computer played " +
              (playerChoice == 0
                ? "paper."
                : playerChoice == 1 ? "scissors." : "rock."))
          : (playerScore++,
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

newGameButtonElement.addEventListener("click", newGame);