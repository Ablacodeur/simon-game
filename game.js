var gamePattern = [];

var buttonColor = ["red","blue","green","yellow"];// new array

var userClickedPattern = [];

var level= 0; // set level start to 0
var started = false // set start to false

// keypress function
$(document).keypress(function(){
  if (!started) {
    $("#level-title").text("level "+ level);
    nextSequence();
    started = true
  }
});


// button click function
$(".btn").click (function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1); //Appeler checkAnswer() après qu'un utilisateur a cliqué et choisi sa réponse, en transmettant l'index de la dernière réponse dans la séquence de l'utilisateur.

});



function nextSequence(){
  userClickedPattern = []; //reset the userclikedpattern into empty
  level++ // increase the level every time nextsequence was call
  $("#level-title").text("level "+ level);
  var randomNumber = Math.floor(Math.random()*4);

  var randomChosenColor = buttonColor[randomNumber];//chose the button color in array with the random nomebr

  gamePattern.push(randomChosenColor)// push the new random into the empty array

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);// chose the id of the button and animate it
  playSound(userChosenColour);
  
};


function checkAnswer(currentLevel){
  //vérifier si la réponse la plus récente de l'utilisateur est la même que le modèle de jeu
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log('success')
  }
  //Si l'utilisateur a trouvé la réponse la plus récente à l'étape 3, vérifiez qu'il a terminé sa séquence avec une autre instruction if.
  if (userClickedPattern.length === gamePattern.length) {
    setTimeout(function (){
      nextSequence();
    },1000)
  }
  else{
    console.log("wrong");
    
    playSound("wrong");// play wrong.mp3 sound

    $("body").addClass("game-over");// add a class in css

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart"); // change the h1

    startOver();// call startover function
  }
}


// start over function
function startOver(){
  //reset the values
  var level = 0;
  gamePattern = [];
  var started = false;
}


//  refactor an audio function for both
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3"); //play audio
  audio.play();
}
// add a class pressed 
function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  // remove the animation
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  },100);
};



