const board = document.querySelector('.board');
const StratButton = document.querySelector(' .btn-start');
const modal = document.querySelector(".modal");
const startModal = document.querySelector(".modal");
const gameOverModal = document.querySelector(".game-over");
const resartBtn = document.querySelector(".btn-restart");


const highScoreElemnt = document.querySelector("#high-score")
const scoreElemnet = document.querySelector("#score");
const timeElement = document.querySelector("#time");


const blockHeight = 50;
const blockWidth = 50;
let highscore = localStorage.getItem("highscore") || 0;
let score = 0;
let time = `00-00`;
const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

highScoreElemnt.innerText = highscore

let interval = null;
let food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) };

/*
for(let i =0; i<row *cols; i++){
    const block = document.createElement('div');
    block.classList.add("blocks");
    board.appendChild(block);
}
*/

let seconds = 0;
const blocks = [];
let snake = [
     { x: 1, y: 3 }
]
let direction = 'right';
for (let row = 0; row < rows; row++) {
     for (let col = 0; col < cols; col++) {
          const block = document.createElement('div');
          block.classList.add("blocks");
          board.appendChild(block);
          //block.innerText =`${row}-${col}`;
          blocks[`${row}-${col}`] = block
     }
}
function updateTimer(){
    seconds++;
    timeElement.innerText = seconds;
}
function render() {
     let head = null;
     blocks[`${food.x}-${food.y}`].classList.add("food")
     if (direction === "left") {
          head = { x: snake[0].x, y: snake[0].y - 1 }
     } else if (direction === "right") {
          head = { x: snake[0].x, y: snake[0].y + 1 }
     } else if (direction === "down") {
          head = { x: snake[0].x + 1, y: snake[0].y }
     } else if (direction === "up") {
          head = { x: snake[0].x - 1, y: snake[0].y }
     }

     if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
          //alert("GAME OEVER");
          clearInterval(interval);
          gameOverModal.style.display = "flex";
          return;
     }

     //food counsumned
     if (head.x == food.x && head.y == food.y) {
          blocks[`${food.x}-${food.y}`].classList.remove("food");
          food = {
               x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)
          }
          blocks[`${food.x}-${food.y}`].classList.add("food")
          score += 10;
          scoreElemnet.innerText = score;

          if (score > highscore) {
               console.log("Highscore update:", score);

               highscore = score;
               highScoreElemnt.innerText = highscore;
               localStorage.setItem("highscore", highscore);
          }
          snake.unshift(head)
     }


     snake.forEach(segment => {
          blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
          blocks[`${segment.x}-${segment.y}`].classList.remove("head");
     });

     snake.unshift(head);
     snake.pop();

     snake.forEach(segment => {
          blocks[`${segment.x}-${segment.y}`].classList.add("fill")
     })

     blocks[`${snake[0].x}-${snake[0].y}`].classList.add("head");
}


// interval = setInterval(()=>{ 
//    render();
// },400);

StratButton.addEventListener("click", ()=>{
    startModal.style.display="none"
    interval = setInterval(()=>{render() },100)

    setInterval(updateTimer, 1000);
})

resartBtn.addEventListener("click", Gameresart);

function Gameresart() {

     clearInterval(interval);

     gameOverModal.style.display = "none";

     // Score reset
     score = 0;
     scoreElemnet.innerText = 0;

     snake = [{ x: 1, y: 3 }];
     direction = "down";

     food = {
          x: Math.floor(Math.random() * rows),
          y: Math.floor(Math.random() * cols)
     };

     Object.values(blocks).forEach(block => {
          block.classList.remove("fill");
          block.classList.remove("head");
          block.classList.remove("food");
     });

     interval = setInterval(render, 300);
     
}

addEventListener("keydown", (event) => {
     if (event.key == "ArrowUp") {
          direction = "up"
     } else if (event.key == "ArrowRight") {
          direction = "right"
     } else if (event.key == "ArrowLeft") {
          direction = "left";
     } else if (event.key == "ArrowDown") {
          direction = "down";
     }
})


