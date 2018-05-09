var redSnd = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var blueSnd = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"
);
var greenSnd = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"
);
var yellowSnd = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
);
var loseSnd = new Audio(
  "http://www.sounds.beachware.com/2illionzayp3may/illwavul/BUZZER2.mp3"
);
var playArr = [];
var buttons = [
  [document.getElementById("redButton"), redSnd, "redButton-active"],
  [document.getElementById("blueButton"), blueSnd, "blueButton-active"],
  [document.getElementById("greenButton"), greenSnd, "greenButton-active"],
  [document.getElementById("yellowButton"), yellowSnd, "yellowButton-active"]
];
var moveArr = [];
var score = 0;
var turn = 0;
var strictMode = false;
var gameOn = false;
var diffTimer = 1010;
var hiScore = 0;

function play(audio) {
    if (audio.paused) {
        audio.play();
    }else{
        audio.currentTime = 0
    }
}

function setDifficulty(newDiff) {
  
}

function beepboop(move) {
  buttons[move][1].play();

  $(buttons[move][0]).addClass(buttons[move][2]);

  var stopThat = setTimeout(function() {
    $(buttons[move][0]).removeClass(buttons[move][2]);
  }, (diffTimer - 110))
}

function shortboop(move) {
  buttons[move][1].play();

  $(buttons[move][0]).addClass(buttons[move][2]);

  var stopThat = setTimeout(function() {
    $(buttons[move][0]).removeClass(buttons[move][2]);
  }, 200);
}

function setPattern() {
  var nextMove = Math.floor(Math.random() * 4);
  beepboop(nextMove);
  moveArr.push(nextMove);
}

function simonSays() {
  for (var i = 0; i < moveArr.length; i++) {
    let thisMove = moveArr[i];
    setTimeout(function() {
      beepboop(thisMove);
    }, diffTimer * i);
  }

  setTimeout(function() {
    setPattern();
  }, diffTimer * moveArr.length + 1);
}

function nowYouSay(val) {
  
  playArr.push(val);

  if (val !== moveArr[turn]) {
    if (strictMode === false) {
      loseSnd.play();
      playArr = [];
      turn = 0;
      setTimeout(function() {
        for (var i = 0; i < moveArr.length; i++) {
          let thisMove = moveArr[i];
          setTimeout(function() {
            beepboop(thisMove);
          }, diffTimer * i);
        }
      }, 1000);
    }
   else if (strictMode === true) {
    if (score > hiScore){ hiScore = score; }
    document.getElementById("loseText").style.display = "block";
    loseSnd.play();
    playArr = [];
    gameOn = false;
  } } else if (playArr.length === moveArr.length) {
    score++;
    $("#score-counter").text(score);
    
    if (score >= 20 && strictMode === false){
      document.getElementById("winText").style.display = "block";
      loseSnd.play();
      playArr = [];
      gameOn = false;
    } else {
    
    setTimeout(function() {
      playArr = [];
      simonSays();
      turn = 0;
    }, 1000);
    }
  } else {
    turn ++;
  }

}

function resetGame() {
  if (score > hiScore){
    hiScore = score;
  }
  gameOn = false;
  moveArr = [];
  playArr = [];
  score = 0;
  turn = 0;
  $("#score-counter").text("--");
  document.getElementById("loseText").style.display = "none";
  document.getElementById("winText").style.display = "none";
  for (var i = 0; i < buttons.length; i++) {
    $(buttons[i][0]).removeClass(buttons[i][2]);
  }
}

$(document).ready(function() {
  $("#score-counter").text("--");

  $("#resetBtn").on("click", function() {
    resetGame();
  });

  $("#redButton").on("click", function() {
    if (gameOn === true) {
      shortboop(0);
      nowYouSay(0);
    } else beepboop(0);
  });

  $("#blueButton").on("click", function() {
    if (gameOn === true) {
      shortboop(1);
      nowYouSay(1);
    } else beepboop(1);
  });

  $("#greenButton").on("click", function() {
    if (gameOn === true) {
      shortboop(2);
      nowYouSay(2);
    } else beepboop(2);
  });

  $("#yellowButton").on("click", function() {
    if (gameOn === true) {
      shortboop(3);
      nowYouSay(3);
    } else beepboop(3);
  });

  $("#goBtn").on("click", function() {
    resetGame();
    setPattern();
    gameOn = true;
  });

  $(".hi-score-btn").on("mousedown", function() {
    $("#hi-score-btn").addClass("hi-score-btn-active");
   document.getElementById("hi-score-display").style.display = "block";
    $("#score-counter").text(hiScore);
  });
  $(".hi-score-btn").on("mouseup", function() {
    $("#hi-score-btn").removeClass("hi-score-btn-active");
    document.getElementById("hi-score-display").style.display = "none";
    if (score === 0){
      $("#score-counter").text("--");
    } else { 
      $("#score-counter").text(score);
    }
  });
  
  $("#diffSlider").on("click", function(){
    resetGame();
    if (strictMode === false){
      $("#diffSlider").addClass("diffSlider-med");
      strictMode = true;
    } else
    if (strictMode === true && diffTimer > 1000){
      $("#diffSlider").removeClass("diffSlider-med");
      $("#diffSlider").addClass("diffSlider-hard");
      diffTimer = 300;
    } else
    if (strictMode === true && diffTimer <= 1000){
      $("#diffSlider").removeClass("diffSlider-med");
      $("#diffSlider").removeClass("diffSlider-hard");
      diffTimer = 1010;
      strictMode = false;
    }
    
  });
  
  $("#loseText").on("click", function(){
    resetGame();
  });
  $("#winText").on("click", function(){
    resetGame();
  });
  
  $("#hidden-help").on("click", function(){
    document.getElementById("hidden-help").style.display = "none";
    document.getElementById("help-text").style.display = "block";
  });
  
  $("#help-text").on("click", function(){
    document.getElementById("hidden-help").style.display = "block";
    document.getElementById("help-text").style.display = "none";
  })
  
});