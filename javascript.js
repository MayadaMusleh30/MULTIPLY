var playing = false;
var score;
var action;
var timerem;
var correctA;

//if start button clicked
document.getElementById("startreset").onclick = function(){
    //if playing
    if(playing == true){
         //reload page   
        location.reload();
    }
    else{//if not playing
        
        //set score to 0 and playing to true
        playing = true;
        score = 0;
        document.getElementById("scoreval").innerHTML = score;
        
        //show countdown box 
        document.getElementById("time").style.display = "block";
        timerem = 60;
        document.getElementById("timeval").innerHTML = timerem;
        //change button to reset
        document.getElementById("gameover").style.display = "none";
        document.getElementById("startreset").innerHTML = "Reset Game";
        
        //start countdown
        startcount();
        
        //Generate new Q&A
        generateQA();
    }
}

//clicking on answer box
for(i = 1; i < 5; i++) {
    document.getElementById("box" + i).onclick = function(){
    //check if we are playing
    if(playing == true){//yes
        if(this.innerHTML == correctA){
           //correct answer increase score by 1
            score++;
            document.getElementById("scoreval").innerHTML = score;
            
            //hide wrong box and show correct box
            document.getElementById("wrong").style.display="none";
            document.getElementById("correct").style.display="block";
            setTimeout(function(){
                document.getElementById("correct").style.display="none";
            }, 1000);
            //generate new question
            generateQA();
           }
        else{
            //wrong answer
            document.getElementById("correct").style.display="none";
            document.getElementById("wrong").style.display="block";
            setTimeout(function(){
                document.getElementById("wrong").style.display="none";
            }, 1000);
       }
    }
}
}


function startcount(){
    action = setInterval(function(){
        timerem -= 1;
        document.getElementById("timeval").innerHTML = timerem;
        if(timerem == 0){//game over
            stopcount();
        document.getElementById("gameover").style.display = "block";
            document.getElementById("gameover").innerHTML = "<p>Game over!</p><p>Your score is " + score + "</p><p>Press start for new game</p>";
  
            document.getElementById("correct").style.display = "none";        
            document.getElementById("wrong").style.display = "none";
        playing = false;
        document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000);
}

function stopcount(){
    clearInterval(action);
}

function generateQA(){
    var x = 1 + Math.round(9*Math.random());
    var y = 1 + Math.round(9*Math.random());
    correctA = x * y;
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1 + Math.round(3*Math.random());
    document.getElementById("box" + correctPosition).innerHTML = correctA; //fill one box with correct answer
    //fill other boxes with incorrect answers
    
    var answers = [correctA];
    
    for(i = 1; i < 5; i++){
        if(i !== correctPosition){
            var wrongA;
            do{
                wrongA = 1 + Math.round(9*Math.random()) * 1 + Math.round(9*Math.random());//wrong answer
            }while (answers.indexOf(wrongA) > - 1)
            document.getElementById("box" + i).innerHTML = wrongA;
            
            answers.push(wrongA);
        }
    }
}