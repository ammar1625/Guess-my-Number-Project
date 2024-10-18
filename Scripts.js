"use strict";
//var to store random num 
let Rand=0;

//var to store user input guess
let GuessNumber = 0;
//let CurrentHighScore = 0;

//object to store the score infos
let ScoreObj = 
{
    Currentscore:20,
    HighScore : 0,

}

//dom elements
let AgainBtn = document.querySelector(".again");
let NumInput = document.querySelector(".number-input");
let PlayerChoice = document.querySelector(".player-choice");
let CheckBtn = document.querySelector(".check");
let LblStatus = document.querySelector(".label-status");
let Score = document.querySelector(".score-value");
let HighScore = document.querySelector(".high-score-value");
let statusIcon = document.querySelector(".status-icon");
let ResultValue = document.querySelector(".result");




//generate random number between range
function getRandomNumber(min, max)
{
    let Random = Math.floor(Math.random() * (max - min + 1)) + min;
    return Random;
}

function GetTheHighestScore()
{
    let HighScore = 0;
    HighScore = ScoreObj.HighScore;

    if(ScoreObj.Currentscore > ScoreObj.HighScore)
        {
            ScoreObj.HighScore = ScoreObj.Currentscore;

            HighScore = ScoreObj.HighScore;
        }

        return HighScore;
}

function UpdateHighScore()
{
   HighScore.innerHTML = GetTheHighestScore();
}

function GenerateNewRandomNumber()
{
   Rand =  getRandomNumber(1,20);
}

function ResetScore()
{
  
       
  LblStatus.textContent = "Start Guessing..."
  ScoreObj.Currentscore = 20;
  Score.innerHTML = ScoreObj.Currentscore;
  statusIcon.style.cssText = 
  `
   visibility: hidden;
  `;

  document.body.style.backgroundColor = " rgb(43, 42, 42)";

  NumInput.value = "";
  ResultValue.textContent = "?";
  PlayerChoice.textContent ="?";
  
}

function StartTheGame()
{
    GenerateNewRandomNumber();
    
}



function ResetGame()
{
    AgainBtn.addEventListener("click",()=>{
        //regenerate a random number
        GenerateNewRandomNumber();
        
        //reset score
        ResetScore();
       
        
    });
}

function GetPlayerInputNum()
{
    let Num  = Number (NumInput.value);
    return Num;
}

function DisplayPlayerGuessNumber()
{
    PlayerChoice.textContent = GuessNumber;
}

function ReduceTheScrore()
{
    ScoreObj.Currentscore -=1;
    Score.innerHTML = ScoreObj.Currentscore;
}

function UpdateStatusMessage(Message , Icon)
{
            LblStatus.innerHTML = Message;
            statusIcon.style.visibility = "visible";
            statusIcon.src = `./icons/${Icon}.png`;
}

function HasLost()
{
    return !(ScoreObj.Currentscore > 1);   
}

function ShowYouLostMessage()
{
     //check is this is the last wrong attempt so the player lose otherwise not 
     if(!HasLost())
        {
           ReduceTheScrore();  
        }
        else
        {
            ReduceTheScrore();
            UpdateStatusMessage("You Lost :-(","low");
        }
}

function CheckPlayerInput()
{
    
   CheckBtn.addEventListener("click",()=>{
    //get the player guess number
    GuessNumber = GetPlayerInputNum();

    //display it on the screen
    DisplayPlayerGuessNumber();

    //check is the input value is null get out of the function
    if(NumInput.value==0 )
        {
          return;
        }
    
    //clear the number input    
    NumInput.value = "";
    
    if(GuessNumber === Rand)
        {
            
            UpdateStatusMessage("You Got It!","win");

            ResultValue.innerHTML  = Rand;
            document.body.style.backgroundColor  = "green";
            UpdateHighScore();

           
        }
        else if(GuessNumber < Rand)
            {
                UpdateStatusMessage("Too Low!","low");
                ShowYouLostMessage();   
            }
            else
            {
                UpdateStatusMessage("Too High","high");
                ShowYouLostMessage();
            }


   });

}

StartTheGame();

CheckPlayerInput();

ResetGame();


