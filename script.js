let canvas;
let canvasContext;

let circleX = 400-2;
let circleY = 300;

let circleSpeedX = 6;
let circleSpeedY = 3;

let paddleY = 250;
const PADDLE_HEIGHT = 100;

let paddleY2 = 250;
const PADDLE_HEIGHT2 = 100;

let humanScore = 0;
let aiScore = 0;

let playing = true;
let playingComputer = true;
let player2 = false;

let startBtn = document.querySelector('#start');
let restartBtn = document.getElementById('restart');
let pauseBtn = document.querySelector('#pause');
let player2Btn = document.querySelector('#player2');
let computerBtn = document.querySelector('#computer');
let easyBtn = document.querySelector('#easy');
let mediumBtn = document.querySelector('#medium');
let hardBtn = document.querySelector('#hard');

document.body.style.backgroundColor = "black";


/*------------------------------START Player----------------------------------*/
function calculateMousePos(evt){                            //en event starter hver gang musen er i bevægelse
    let rect = canvas.getBoundingClientRect();              //det er vores gameboard 
    let root = document.documentElement;                    //tager vores gameboard fra html
    let mouseX = evt.clientX - rect.left - root.scrollLeft; //den er ligeglad hvis jeg scroller, den følger altid med hvis musen er i websiden
    let mouseY = evt.clientY - rect.top - root.scrollTop;   //substracts the x and y coordinates within the playable space
    return{
        x:mouseX,
        y:mouseY
    };
}
/*------------------------------SLUT Player----------------------------------*/


window.onload = function(){                                     //Alt events starter når siden er loaded.
    playing = false;
    canvas = document.getElementById('gamecanvasid');
    canvasContext = canvas.getContext('2d');
    
    hitSound = new hitSoundClass('http://commondatastorage.googleapis.com/codeskulptor-assets/Collision8-Bit.ogg')
    pointsSound = new pointsSoundClass('http://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a')
    damageSound = new damageSoundClass('damage.wav')
    
    let framesPerSecond = 60;                                   //60 fps
    setInterval(startGame, 1000/framesPerSecond);               //God til et snake spil fordi setInterval er 1000 miliseconds
    
    canvas.addEventListener('mousemove', function(evt){         //en event starter hver gang musen bevæger sig
        let mousePos = calculateMousePos(evt);                  //evt = event
        paddleY = mousePos.y-(PADDLE_HEIGHT/2);                 
    });

    
}




function startGame(){
    move();
    drawEverything(); 
    decider();  
    
}

player2Btn.addEventListener('click', player2func);

function player2func(){
    playingComputer = false;
    
}

computerBtn.addEventListener('click', playerAi);

function playerAi(){
    playingComputer = true;
}

pauseBtn.addEventListener('click', function(){
    pauser();
});

function pauser(){
    playing = false;
}


startBtn.addEventListener('click', function(){
    setTimeout(starter, 3000)
});

function starter(){
    playing = true
}

restartBtn.addEventListener('click', restartfunc);

function restartfunc(){
    aiScore = 0;
    humanScore = 0;
    circleX = 400-2;
    circleY = 300;
    playing = false;
}

function decider(){
let win = 'You win! Wanna win again?';
let lose = 'You lose! Try again?';
if(aiScore >= 3){
    drawPlatform(0,0,canvas.width, canvas.height, 'black');
    canvasContext.font = '30px monospace';
    canvasContext.fillStyle = 'red'
    canvasContext.fillText(lose, 100,200)
    playing = false;
    
    
} else if (humanScore >= 3){
        drawPlatform(0,0,canvas.width, canvas.height, 'black');
        canvasContext.font = '30px monospace';
        canvasContext.fillStyle = 'cyan'
        canvasContext.fillText(win, 100,200)
        playing = false;
    }
}


function move(){
    if(playing === true){
      computerDifficulty();  
                             
    circleX = circleX + circleSpeedX;
    circleY = circleY + circleSpeedY;
    
    if(circleX < 0){                                    //hvis cirkel er større end 800, vender cirklen tilbage                 
        if(circleY > paddleY && circleY < paddleY + PADDLE_HEIGHT){
            circleSpeedX = -circleSpeedX
            circleSpeedY = circleSpeedY + (circleY - (paddleY + PADDLE_HEIGHT/2))/15;   //hvis bolden rammer kanten af paddle, får man en bedre chance at vinde
            circleSpeedX++;
            hitSound.play();
        } else {
            reset();
            aiScore++; 
            damageSound.play();  
            
        }
    } if(circleX > canvas.width){                       //hvis cirkel er mindre end 0, vender cirklen tilbage
        if(circleY > paddleY2 && circleY < paddleY2 + PADDLE_HEIGHT2){
            circleSpeedX = -circleSpeedX
            circleSpeedY = circleSpeedY + (circleY - (paddleY2 + PADDLE_HEIGHT2/2))/15; //hvis bolden rammer kanten af paddle, får man en bedre chance at vinde
            circleSpeedX--;
            hitSound.play();
        } else {
            reset();
            humanScore++;
            pointsSound.play();
        }
    } if(circleY < 0){                                  //hvis cirkel er større end 600, vender cirklen tilbage
        circleSpeedY = -circleSpeedY;
        
    } if(circleY > canvas.height){                      //hvis cirkel er mindre end 0, vender cirklen tilbage
        circleSpeedY = -circleSpeedY;
        
    }
}
}

function computerDifficulty(){                              //computer AI 
    if(playingComputer === true){
    let paddleY2Center = paddleY2 + (PADDLE_HEIGHT2/2);
    if(paddleY2Center < circleY - 35){              //hvis paddleY2Center er mindre end cirkelY - 35, så bevæger den sig nedad
        paddleY2 +=6;                               //hastighed af Y-aksen. lavere er langsommere
    } else if(paddleY2Center > circleY + 35){       //hvis paddleY2Center er større end cirkelY + 35, så bevæger den sig opad
        paddleY2 -=6;                               //hastighed af Y-aksen. lavere er langsommere
    }

}
}

function reset(){                        //hvis cirklen rammer sidene, resetter cirklen
    if(circleX > 800){                   //hvis bolden er mere end 800(canvas.width)
        circleX = 800/2;                 //placer bolden i midten
        circleY = 600/2;                 //placer bolden i midten
        circleSpeedY = -3                //hvis jeg vinder, så går bolden til højre, når den starter igen                
        circleSpeedX = 5;                //resetter boldens speed
        
        
    } if(circleX < 0){                   //hvis bolden er mindre eller lige med 0(canvas.width)
        circleX = 800/2;                 //placer bolden i midten
        circleY = 600/2;                 //placer bolden i midten
        circleSpeedY = 3;                //hvis jeg taber, så går bolden til venstre, når den starter igen
        circleSpeedX = -5;               //resetter boldens speed
        /*const myImage = new Image(canvas.width, canvas.height);
        myImage.src = 'data:image/jpeg;base64,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';
        document.body.appendChild(myImage);*/
    }
}



function drawEverything(){
    
    drawPlatform(0,0,canvas.width, canvas.height, 'black');                 //baggrund farve
    canvasContext.fillStyle = 'red';                                    //hvid linje(player1 - venstre)
    canvasContext.fillRect(canvas.width-800,paddleY,10,PADDLE_HEIGHT);  //(stillingX, stillingY, bredde, højde)
    canvasContext.fillStyle = 'dodgerblue';                             //hvid linje(player2 - højre)
    canvasContext.fillRect(canvas.width-10,paddleY2,10,PADDLE_HEIGHT2); //(stillingX, stillingY, bredde, højde)
    canvasContext.fillStyle = 'white';                                  //hvid linje(I midten)                          
    canvasContext.fillRect((canvas.width/2)-5,0,5,canvas.height);                     //(stillingX, stillingY, bredde, højde)
    circlefunc(circleX, circleY, 10, '#ffd319');                           //cirkel farve(bold)                
    canvasContext.fillStyle = 'lime';
    canvasContext.font = '50px Arial';
    canvasContext.fillText(humanScore, 175, 100);                       //human score
    
    canvasContext.fillText(aiScore, 575, 100);                          //ai score
    drawSide();
    drawSide2();
    drawSide3();
    drawSide4();
    drawCircleMid();
    
}

function drawPlatform(leftX, topY, width, height, drawColor){               //baggrund farve
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(0,0,canvas.width,canvas.height);
}

function drawSide(){        //left
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(0,0,3,canvas.height);
}

function drawSide2(){       //top
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(0,0,canvas.width,3);
}

function drawSide3(){       //bottom
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(0,597,canvas.width,3);
}

function drawSide4(){       //right
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(797,0,3,canvas.height);
}

function drawCircleMid(){
    canvasContext.fillStyle = 'white';
    canvasContext.arc(0,0, 5, 0, 2 * Math.PI);
}

function drawText(){
    canvasContext.fillStyle = 'white';
    canvasContext.font = '50px Arial';
    canvasContext.fillText(title, 200, 50);
}

function circlefunc(centerX, centerY, radius, drawColor){               //cirkel farve(bold)
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}

/*---------------------------------START LYD--------------------------------------*/
function damageSoundClass(src) {
    this.damageSoundClass = document.createElement("audio");
    this.damageSoundClass.src = src;
    this.damageSoundClass.setAttribute("preload", "auto");
    this.damageSoundClass.setAttribute("controls", "none");
    this.damageSoundClass.style.display = "none";
    document.body.appendChild(this.damageSoundClass);
    this.play = function(){
      this.damageSoundClass.play();
    }
  }

function pointsSoundClass(src) {
    this.pointsSoundClass = document.createElement("audio");
    this.pointsSoundClass.src = src;
    this.pointsSoundClass.setAttribute("preload", "auto");
    this.pointsSoundClass.setAttribute("controls", "none");
    this.pointsSoundClass.style.display = "none";
    document.body.appendChild(this.pointsSoundClass);
    this.play = function(){
      this.pointsSoundClass.play();
    }
  }

function hitSoundClass(src) {
    this.hitSoundClass = document.createElement("audio");
    this.hitSoundClass.src = src;
    this.hitSoundClass.setAttribute("preload", "auto");
    this.hitSoundClass.setAttribute("controls", "none");
    this.hitSoundClass.style.display = "none";
    document.body.appendChild(this.hitSoundClass);
    this.play = function(){
      this.hitSoundClass.play();
    }
  }
/*---------------------------------SLUT LYD--------------------------------------*/