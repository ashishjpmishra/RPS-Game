const start = document.getElementById("start");
const time = document.getElementById("time");
const rules = document.getElementById("rules");
const ruleboard = document.getElementById("ruleboard");
const close = document.getElementById("close");
const gameArea = document.getElementById("game-area");
const winArea = document.getElementById("win-area");
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const winLeft = document.getElementById("win-left");
const winRight = document.getElementById("win-right");
const playAgain = document.getElementById("play-again");
const cScore = document.getElementById("c-score");
const yScore = document.getElementById("y-score");
const WinnerSection = document.getElementById("winner-section");
const gameRestart = document.getElementById("game-restart");
const resultMessage = document.getElementById("result-message");
const celebration = document.getElementById("celebration");
const restart = document.getElementById("restart");

let GameChoice = ["Rock","Paper","Scissors"]
let computerScore = 0;
let playerScore = 0;
let playerChoice, computerChoice;

if(localStorage.getItem("scores")!== null){
    let storedScore = JSON.parse(localStorage.getItem("scores"));
    yScore.innerText = storedScore.yScore;
    cScore.innerText = storedScore.cScore;
}

// const restartG=()=>{
//     setTimeout(()=>{
//         gameRestart.style.display= "none";
//     },3000)
// }

const reset=()=>{
    gameArea.style.display= "block";
    winArea.style.display= "none";
    gameRestart.style.display= "block";
}

const celebrate = ()=>{
    gameArea.style.display= "none";
    winArea.style.display= "none";
    celebration.style.display ="block";
    restart.style.display ="block"
    resultMessage.innerText = "Hurray !!! You WON"
}

const lost= ()=>{
    reset();
    // restartG();
    resultMessage.innerText = "You Lost Against Computer"
}

const winOrTie =()=>{
    if(playerScore>computerScore){
        console.log("Congratulations you won")
        reset();
        celebrate();
    } 
    else{
        console.log("tie")
        reset();
        // restartG();
        resultMessage.innerText = "It's a Tie!"
    } 
}

const startPlay=()=>{
    yScore.innerText = 0;
    cScore.innerText = 0;
    gameArea.style.display= "block";
    setTimeout(()=>{
        playerScore>=computerScore ? winOrTie() : lost();
    },15000)
    setInterval(()=>{
        time.innerText = `${parseInt(time.innerText)>0 ? parseInt(time.innerText)-1 : 0}`;
    },1000)
    start.style.display = "none";
}

const renderWinner=(cChoice,pChoice)=>{
    let cImage,pImage;
    const rockImage = document.createElement("img");
    rockImage.setAttribute("src","./Assets/rock.png");
    const paperImage = document.createElement("img");
    paperImage.setAttribute("src","./Assets/paper.png");
    const scissorsImage = document.createElement("img");
    scissorsImage.setAttribute("src","./Assets/scissors.png");

    if(cChoice==="Rock"){
        cImage = rockImage;
    }
    if(pChoice=== "Rock"){
        pImage = rockImage
    }
    
    if(cChoice==="Paper"){
        cImage = paperImage;
    }
    if(pChoice=== "Paper"){
        pImage = paperImage
    }
    
    if(cChoice==="Scissors"){
        cImage = scissorsImage;
    }
    if(pChoice=== "Scissors"){
        pImage = scissorsImage
    }
    
    console.log(pImage,cImage);
    winLeft.appendChild(pImage);
    winRight.appendChild(cImage);

}

const gameFunction = ()=>{
    computerChoice = GameChoice[Math.floor(3*Math.random())];
    if(playerChoice === computerChoice){
        console.log("tie");
        WinnerSection.innerText = `Both Selected =>
                                     Tie`
    }
    else if(playerChoice==="Rock" && computerChoice==="Scissors"){
        console.log("you win");
        WinnerSection.innerText =  `<=You Selected | Computer Selected =>
                                    You Won`
        playerScore++;
        yScore.innerText = playerScore;
    }
    else if(playerChoice==="Rock" && computerChoice==="Paper"){
        console.log("you Lost");
        WinnerSection.innerText = `<=You Selected | Computer Selected =>
                                    You Lost`
        computerScore++;
        cScore.innerText = computerScore;
    }
    else if(playerChoice==="Paper" && computerChoice==="Rock"){
        console.log("you win");
        WinnerSection.innerText = `<=You Selected | Computer Selected =>
                                    You Won`
        playerScore++;
        yScore.innerText = playerScore;
    }
    else if(playerChoice==="Paper" && computerChoice==="Scissors"){
        console.log("you Lost");
        WinnerSection.innerText = `<=You Selected | Computer Selected =>
                                    You Lost`
        computerScore++;
        cScore.innerText = computerScore;
    }
    else if(playerChoice==="Scissors" && computerChoice==="Rock"){
        console.log("you Lost");
        WinnerSection.innerText = `<=You Selected | Computer Selected =>
                                    You Lost`
        computerScore++;
        cScore.innerText = computerScore;
    }
    else if(playerChoice==="Scissors" && computerChoice==="Paper"){
        console.log("you win");
        WinnerSection.innerText = `<=You Selected | Computer Selected =>
                                    You Won`
        playerScore++;
        yScore.innerText = playerScore;
    }

    let scores = {cScore:computerScore, yScore:playerScore}

    localStorage.setItem("scores", JSON.stringify(scores))
    renderWinner(computerChoice,playerChoice)
    
    console.log(`computer: ${computerScore} and you: ${playerScore}`)

}

// rules
rules.addEventListener("click", ()=>{
    ruleboard.style.display= "block";
    close.style.display= "block";
})

close.addEventListener("click", ()=>{
    ruleboard.style.display= "none";
    close.style.display= "none";
})

// game logic
rock.addEventListener("click", ()=>{
    gameArea.style.display= "none";
    winArea.style.display= "block";
    playerChoice = "Rock";
    gameFunction();
})
paper.addEventListener("click", ()=>{
    gameArea.style.display= "none";
    winArea.style.display= "block";
    playerChoice = "Paper";
    gameFunction();
})
scissors.addEventListener("click", ()=>{
    gameArea.style.display= "none";
    winArea.style.display= "block";
    playerChoice = "Scissors";
    gameFunction();
})
playAgain.addEventListener("click", ()=>{
    gameArea.style.display= "block";
    winArea.style.display= "none";
    winLeft.innerHTML=""
    winRight.innerHTML=""
})
restart.addEventListener("click", ()=>{
    location.reload();
    localStorage.clear();
})
start.addEventListener("click", ()=>{
    localStorage.clear();
    startPlay();
})

