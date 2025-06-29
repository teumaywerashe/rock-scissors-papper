 var randomNumber

 var result
     /*var score = {
         win: 0,
         lose: 0,
         tie: 0
     };*/
 var score = JSON.parse(localStorage.getItem('score')) || ({
     win: 0,
     lose: 0,
     tie: 0
 });

 function reset() {
     score.win = 0
     score.lose = 0
     score.tie = 0
     localStorage.removeItem("score");
     document.getElementById("result").innerHTML = `result updated`;
     updateResult();


 }

 function computerMove() {
     var computerGuess
     randomNumber = Math.random();
     if (randomNumber < 1 / 3) {
         computerGuess = "✌️"
     } else if (randomNumber < 2 / 3) {
         computerGuess = "✊"
     } else {
         computerGuess = "✋";
     }
     return computerGuess;
 }

 function computer(playerGuess) {
     var computerGuess = computerMove();
     if (computerGuess == playerGuess) {
         result = "tie"
         score.tie++;
     } else {
         if (((computerGuess == "✊") && (playerGuess == "✌️")) || ((computerGuess == "✋") && (playerGuess == "✊")) || ((computerGuess == "✌️") && (playerGuess == "✋"))) {
             result = "lose"
             score.lose++
         } else {
             result = "win"
             score.win++;
         }
     }
     localStorage.setItem("score", JSON.stringify(score));

     document.getElementById("result").innerHTML = `you ${result}`;

     document.getElementById("move").innerHTML = (`you:<button>${playerGuess}</button>  <button>${computerGuess}</button>computer`)

     updateResult();


 }

 function updateResult() {
     document.getElementById("score").innerHTML = `win:<button>${score.win} </button>  
            lose:<button>${score.lose}</button>
            tie:<button>${score.tie}</button> `
 }

 let isPlaying = false;
 let intervalId;

 function autoPlay() {

     if (!isPlaying) {
         intervalId = setInterval(function() {
             let playerGuess = computerMove();
             computer(playerGuess);
         }, 1000)
         document.querySelector('.autoplay-button').innerHTML = `Playing(click to-pause)`
         isPlaying = true;
     } else {
         document.querySelector('.autoplay-button').innerHTML = `paused(click to-play)`
         clearInterval(intervalId);
         isPlaying = false;
     }
 }