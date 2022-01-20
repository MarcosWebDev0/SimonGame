var buttoncolors = ["blue", "red", "yellow", "green"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$('.EN').click(function() {
  alert("This game consists of picking colors that are flashing" +
  "after each picked color another one will  show and you have, " +
  "to pick them in the order they were presented. Always start from the first color");
});
$('.BR').click(function(){
  alert("Esse jogo consite de se escolher as cores que estão piscando" +
", depois de escolher cada cor, outra ira piscar, você deve escolher" +
" cada cor seguinte em ordem, sempre começando da primeira.");
});

$('.btn').click(function(event) {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playsound(userChosenColor);
  animatePress(userChosenColor);
  checkanswer(userClickedPattern.length - 1);
});

$(document).keydown(function() {
  if (gamePattern.length === 0) {
    nextSequence();
  }
})

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttoncolors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomChosenColor);
  $('h1').text('Level ' + level);
  level++;
}

function playsound(name) {
  var buttonSound = new Audio('sounds/' + name + '.mp3');
  buttonSound.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkanswer(currrentLevel) {
  if (gamePattern[currrentLevel] === userClickedPattern[currrentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    gameover();
  }
}

function gameover() {
  var gameOverSound = new Audio('sounds/wrong.mp3');
  gameOverSound.play();
  $('body').addClass('game-over');
  setTimeout(function() {
    $('body').removeClass('game-over');
  }, 200);
  $("h1").text("Game Over. Press Any Key to Restart");
  level = 0;
  gamePattern = [];
}
