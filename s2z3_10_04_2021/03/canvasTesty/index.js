let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

// koordynaty srodka x,y + promien kola
let x = 100;
let y = 150;
let r = 20;
let color = "blue";

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


setInterval(() => {
    console.log(xShift, " ", yShift);
    clearBoard();
    drawBall();
    moveBall();
}, 50);


