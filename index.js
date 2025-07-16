var gamePattern = [];

var buttonColors = ["red","blue","green","yellow"];

var userClickedPattern = [];

var started = false;

var level = 0;

function nextSequence() {

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);

    animatePress(randomChoosenColor);

    playSound(randomChoosenColor);
}

var keyboardEvent = $(document).on("keydown",function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});



var userClicked = $(".btn").click(handler);

function handler(event){
    var userChoosenColor = event.target.id;

    userClickedPattern.push(userChoosenColor);

    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickedPattern.length-1);

}

function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){$("#"+currentColor).removeClass("pressed")},100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("right");
    
    if(userClickedPattern.length===gamePattern.length){
        setTimeout(nextSequence,1000);
    }}
    else{
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over")},200);

        $("#level-title").text("Gamer over, Press any key to start");

        startOver();

    }
}

function startOver(){
    level = 0;

    gamePattern = [];

    started = false;
}