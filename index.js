var ButtonColors = ["red", "blue", "yellow", "green"];
var gamepatterns = [];
var userChosenPattern = [];

var BodyColor = $("body").css("background-color");

var started = false;
var level = 0;


$(document).keypress(function (e) { 
    if(e.key === 'a'){
        if(!started){
            $("#level-title").text("Level " + level);
            NextSequence();
            started = true;
        }
    }
 });


$(".btn").click(function () {
  var $this = $(this);
  var original = $this.attr("class").split(" ")[1];
  PlaySound(original);
  userChosenPattern.push(original);
  checkAnswer(original);
  isPressed($this);
});


function checkAnswer(color) {
    var currentIndex = userChosenPattern.length - 1;

    if (userChosenPattern[currentIndex] !== gamepatterns[currentIndex]) {
        

        setTimeout(function () {
            var audio = new Audio("./sounds/wrong.mp3");
            audio.play();
        },100);
        



        $("body").css("background-color","red");

        setTimeout(function() {
            $("body").css("background-color",BodyColor);
        },100);


        $("#level-title").text("Game Over! Press Any Key to Restart");

        StartOver();

        return;
    }

    if (userChosenPattern.length === gamepatterns.length) {
        
        userChosenPattern = [];

        setTimeout(() => {
            NextSequence();
        }, 1000);
    }
}




function NextSequence() {
    level++;

    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var RandomChosenColor = ButtonColors[randomNumber];
    gamepatterns.push(RandomChosenColor);

    $("." + RandomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    PlaySound(RandomChosenColor);


}



function isPressed($this) {
  $this.addClass("pressed");
  setTimeout(function () {
    $this.removeClass("pressed");
  }, 100);
}



function PlaySound(color) {
      var audio = new Audio("./sounds/"+color+".mp3");
      audio.play();
}

function StartOver(){
    level=0;
    gamepatterns = [];
    userChosenPattern =[];
    started = false;

    $(document).keypress(function () {
    if(!started){
        $("#level-title").text("Level " + level);
        NextSequence();
        started = true;
    }
});

    
}
