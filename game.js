$('.btn').css('height', $('.btn').css('width'));

var currentLevel = 0;
var computerSequence = [];
var index = 0;
var newColor;
var highestLevel = 0;
var updater = true;

/*
function correctSound() {
  var correctS = new Audio('sounds/correct.mp3');
  currentLevel>0 ? correctS.play() : 0;
}

function beepSound() {
  var beep = new Audio('sounds/beep.mp3');
  currentLevel>0 ? beep.play() : 0;
}

function blueSound() {
  var blueS = new Audio('sounds/blue.mp3');
  currentLevel>0 ? blueS.play() : 0;
}

function greenSound() {
  var greenS = new Audio('sounds/green.mp3');
  currentLevel>0 ? greenS.play() : 0;
}

function redSound() {
  var redS = new Audio('sounds/red.mp3');
  currentLevel>0 ? redS.play() : 0;
}

function wrongSound() {
  var wrongS = new Audio('sounds/wrong.mp3');
  currentLevel>0 ? wrongS.play() : 0;
}

function yellowSound() {
  var yellowS = new Audio('sounds/yellow.mp3');
  currentLevel>0 ? yellowS.play() : 0;
}
*/

function updateTitle() {
  setTimeout(function() {
    if (updater) {
      $('#level-title').text(highestLevel > 0 ? 'Highest: Level ' + highestLevel : 'Welcome to Memory Game');
    }
    setTimeout(function() {
      if (updater) {
        $('#level-title').text('Press Any Key to Start');
        updateTitle();
      }
    }, 1000);
  }, 1000);
}

function nextSequence() {
  return ['green', 'red', 'yellow', 'blue'][Math.floor(Math.random() * 4)];
}

/*function colorToSound(id) {
  id === 'green' ? greenSound() :
    id === 'red' ? redSound() :
    id === 'yellow' ? yellowSound() :
    id === 'blue' ? blueSound() : 0;
}*/

function flash(id) {
  $('#' + id).addClass('pressed');
  setTimeout(function() {
    $('#' + id).removeClass('pressed');
  }, 150);
}

function levelUp() {
  $('#level-title').text(currentLevel === 0 ? 'Good luck' : 'Great!');
  setTimeout(function() {
    $('#level-title').text('Level ' + (++currentLevel));
  }, 1000);
}

function displayNextColor() {
  newColor = computerSequence[computerSequence.push(nextSequence()) - 1];
  //colorToSound(newColor);
  flash(newColor);
}

function startGame() {
  levelUp();
  updater = false; //stop the recursive function from updating
  setTimeout(displayNextColor, 1000);
}

//caching the sound files to avoid sound lag
/*beepSound();
blueSound();
correctSound();
greenSound();
redSound();
wrongSound();
yellowSound();*/

//executing the title updater recursive function
updateTitle();

//initiate the game on keyboard key press just in case
$(document).keypress(function(event) {
  if (currentLevel === 0) {
    startGame();
  }
});

$('.btn').click(function(event) {
  if (currentLevel === 0) { //if game is not started
    startGame(); //start the game
  }
  else { //if game is already started
    //computerSequence[index] === event.currentTarget.id ? colorToSound(event.currentTarget.id) : wrongSound();
    flash(event.currentTarget.id);

    if (!(computerSequence[index] === event.currentTarget.id)) { //wrong answer game over
      if (highestLevel < currentLevel) {
        highestLevel = currentLevel;
      }
      $('body').addClass('game-over');
      $('#level-title').text('Game Over');
      setTimeout(function() {
        currentLevel = 0;
        computerSequence = [];
        index = 0;
        $('body').removeClass('game-over');
        updater = true;
        updateTitle();
      }, 200);

    } else if (!(++index in computerSequence)) { //right answer from previous condition and this condition is about the last key press in every level.
      //level up and display next color
      setTimeout(function() {
        levelUp();
        //correctSound();
        setTimeout(displayNextColor, 1500);
        index = 0;
      }, 1000);
    }
  }
});
