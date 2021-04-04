
var buttonColor = ["red" , "blue" , "green" , "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$("body").keydown(function()
{
  if(level == 0) nextSequence();
});

$(".btn").click(handler);


function nextSequence()
{
  level++;
  $("h1").text("level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(150).fadeIn(150);
  playSound(randomChosenColor);
}




function handler()
{
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  var lastIndex = userClickedPattern.length - 1;
  checkAnswer(lastIndex);
}


function checkAnswer(currentLevel)
{
 if(userClickedPattern[currentLevel] == gamePattern[currentLevel])
 {
    if(userClickedPattern.length == gamePattern.length)
      {
       userClickedPattern = [];
       setTimeout(nextSequence,1000);
      }
 }
 else
 {
   $("h1").text("Game Over! Press any to restart. ")
   playSound("wrong");
   $("body").addClass("game-over");
   setTimeout(function()
                     {
                      $("body").removeClass("game-over");
                     },200);
   userClickedPattern = [];
   level = 0;
   gamePattern = [];
 }
}


function playSound(name)
{
  var randomMusic = new Audio("sounds/" + name + ".mp3");
  randomMusic.play();
}


function animatePress(currentColor)
{
  var currentButton =   $("#" + currentColor);
  currentButton.addClass("pressed");
  setTimeout(function()
                 {
                   currentButton.removeClass("pressed");
                  },100);
}
