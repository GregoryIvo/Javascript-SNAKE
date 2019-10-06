///
///First JavaScript Project - Wirtten by Gregory Ivo.
///

var mycanvas = document.getElementById('gameCanvas');
var ctx = mycanvas.getContext('2d');
var squareSize = 50;

//ctx.canvas.width  = self.innerWidth-100;
//ctx.canvas.height = self.innerWidth-100;
var width = mycanvas.width;
var height = mycanvas.height;
//ctx.scale(mycanvas.width,mycanvas.height);
var tileCount = {x: width/squareSize, y: height/squareSize};
var GameFps = 10;
var Game= function() {
    gameLoop();
};
var newPiece = []



var keyChage = false;

//snake properties
var snakeState = "Right";
var snake = [{x: 3, y: 3}, {x: 4, y: 3}, {x: 5, y: 3}];

//var fruit properties
var fruitPos = {x: 3, y: 5};
var score = 0;

function printBoard(){
    for (x = 0; x < tileCount.x; x++){
        for (y = 0; y < tileCount.y; y++){
            printSquare(x,y, "White", squareSize);
        }
    }
}

function printSquare(x, y, color, size) {
    // This is the single square
    ctx.fillStyle = color;
    ctx.fillRect(x*size, y*size, size, size);
    // This is the border of the square
    ctx.strokeStyle = 'Black';
    ctx.strokeRect(x*size, y*size, size, size);
}

document.getElementById('startGame').onclick = function () { 
    
        

// Start the game loop
Game._intervalId = setInterval(Game, 1000 / GameFps);
Game._intervalId = setInterval(Game, 1000 / GameFps);

document.getgetElementById('startGame').style.display = "none";

// To stop the game, use the following:
//clearInterval(Game._intervalId);
    

};

function gameLoop(){
    ctx.scale
    ctx.clearRect(0, 0, width, height);
    moveSnake();
    checkCollision();
    printBoard();
    drawSneak();
    keyChage = false;

}

function moveSnake(){

    var previous = {x: snake[0].x, y: snake[0].y};
    switch(snakeState){
        case "Down":
        snake[0].y += 1;
            break;
        case "Up":
        snake[0].y -= 1;
            break;
        case "Right":
        snake[0].x += 1;
            break;
        case "Left":
        snake[0].x -= 1;
            break;
    }
    if (snake[0].x > tileCount.x - 1){
        snake[0].x = 0;
    }
    if (snake[0].x < 0){
        snake[0].x = tileCount.x - 1;
    }
    if (snake[0].y > tileCount.y - 1){
        snake[0].y = 0;
    }
    if (snake[0].y < 0){
        snake[0].y = tileCount.y - 1;
    }

    for (i = 1; i < snake.length; i++){
        var temp = {x: snake[i].x, y: snake[i].y};
        snake[i].x = previous.x;
        snake[i].y = previous.y;
        previous.x = temp.x;
        previous.y = temp.y;
    }
}
function drawSneak(){
    for (i = 0; i < snake.length; i++){
        printSquare(snake[i].x, snake[i].y, "Green", squareSize);
    }
    //Draw Fruit
    printSquare(fruitPos.x, fruitPos.y, "Yellow", squareSize);
}

function checkCollision(){

    //checks and handles fruit collision
    if (snake[0].x == fruitPos.x && snake[0].y == fruitPos.y){
        score += 1;
        //in snake.length game tiks add another peice
        newPiece.push({x: fruitPos.x, y: fruitPos.y});

        fruitPos = {x: Math.floor(Math.random() * (tileCount.x - 1)), y: Math.floor(Math.random() * (tileCount.y - 1))};
    }

    if (newPiece.length > 0){
        for (i = 0; i < newPiece.length; i++){
            if (snake[snake.length - 1].x == newPiece[i].x && snake[snake.length - 1].y == newPiece[i].y){
                snake.push({x: newPiece.x, y: newPiece.y});
                newPiece.pop();
            }
        }
    }

    //checking for body collision
    for (i = 1; i < snake.length; i++){
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            //indicates self colision,  THE GAME IS OVER!
            endGame();
        }
    }

}

function changeSnakeDirection(directionName){

    if (keyChage == false){
        if (snakeState == "Left" && directionName != "Right"){
            snakeState = directionName;
        } else if (snakeState == "Right" && directionName != "Left"){
            snakeState = directionName;
        } else if (snakeState == "Up" && directionName != "Down"){
            snakeState = directionName;
        } else if (snakeState == "Down" && directionName != "Up"){
            snakeState = directionName;
        }
        keyChage = true
    }
}

//key controll listiner
document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
        changeSnakeDirection("Left");
    }
    else if(event.keyCode == 39) {
        changeSnakeDirection("Right");
    }
    else if(event.keyCode == 38) {
        changeSnakeDirection("Up");
    }
    else if(event.keyCode == 40) {
        changeSnakeDirection("Down");
    }
});

document.getElementById('gameUP').onclick = function () { 
    changeSnakeDirection("Up");
}
document.getElementById('gameLeft').onclick = function () { 
    changeSnakeDirection("Left");
}
document.getElementById('gameDown').onclick = function () { 
    changeSnakeDirection("Down");
}
document.getElementById('gameRight').onclick = function () { 
    changeSnakeDirection("Right");
}

function endGame(){
    clearInterval(Game._intervalId);
}


