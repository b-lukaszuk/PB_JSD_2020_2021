let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

// koordynaty srodka x,y + promien kola
const initialX = 150;
const initialY = 120;
let x = initialX;
let y = initialY;
const r = 20;
const color = "blue";

// przesuniecie
let xShift = 5;
let yShift = 5;

function clearBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function moveBall() {
    if (x - r < 0 || x + r > canvas.width) {
        xShift = xShift * -1;
    }
    if (y - r < 0 || y + r > canvas.height) {
        yShift = yShift * -1;
    }
    x = x + xShift;
    y = y + yShift;
}


let intervalId = setInterval(() => {
    console.log(xShift, " ", yShift);
    clearBoard();
    drawBall();
    moveBall();
    if (x === initialX && y === initialY) {
        clearInterval(intervalId)
    }
}, 50);


