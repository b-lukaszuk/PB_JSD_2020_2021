"use strict";

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let balls;
let colors = ["red", "green", "blue", "gray"];

class Ball {
    constructor(x, y, r, col) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = col;
        this.xShift = randInt(-3, 3);
        this.yShift = randInt(-3, 3);
        if (this.xShift === 0 && this.yShift === 0) {
            this.xShift = 3;
        }
        this.mass = 1;
        // this.mass = parseFloat(Math.sqrt(r));
        this.withinCanvas();
    }

    // methods rotate() and resolveCollision() taken from:
    // https://gist.github.com/christopher4lis/f9ccb589ee8ecf751481f05a8e59b1dc
    // modified by me

    rotate(xShift, yShift, angleRad) {
        let newShiftX = 0;
        let newShiftY = 0;
        newShiftX = xShift * Math.cos(angleRad) - yShift * Math.sin(angleRad);
        newShiftY = xShift * Math.sin(angleRad) + yShift * Math.cos(angleRad);
        return [newShiftX, newShiftY];
    }

    resolveCollision(other) {

        // Prevent accidental overlap of particles
        if (this.overlap(other)) {

            // Grab angle between the two colliding particles
            const angle = -Math.atan2(other.y - this.y, other.x - this.x);

            // Store mass in var for better readability in collision equation
            const m1 = this.mass;
            const m2 = other.mass;

            // shifts before equation
            const [u1x, u1y] = this.rotate(this.xShift, this.yShift, angle);
            const [u2x, u2y] = this.rotate(other.xShift, other.yShift, angle);

            // shifts after 1d collision equation
            const s1x = u1x * (m1 - m2) / (m1 + m2) + u2x * 2 * m2 / (m1 + m2);
            const s1y = u1y;
            const s2x = u2x * (m1 - m2) / (m1 + m2) + u1x * 2 * m2 / (m1 + m2);
            const s2y = u2y;

            // Final shifts after rotating axis back to original location
            const [sFinal1x, sFinal1y] = this.rotate(s1x, s1y, -angle);
            const [sFinal2x, sFinal2y] = this.rotate(s2x, s2y, -angle);

            // Swap particle velocities for realistic bounce effect
            this.xShift = sFinal1x;
            this.yShift = sFinal1y;

            other.xShift = sFinal2x;
            other.yShift = sFinal2y;

            // change color (or not, since it may draw the same)
            this.color = colors[randInt(0, colors.length)];
            other.color = colors[randInt(0, colors.length)];
        }
    }

    equalPos(other) {
        return this.x === other.x && this.y === other.y;
    }

    overlap(other) {
        let dx = this.x - other.x;
        let dy = this.y - other.y;
        let c = Math.sqrt((dx * dx) + (dy * dy));
        let distance = Math.abs(c);
        return distance <= (this.r + other.r);
    }

    withinCanvas() {
        let xBetween = (this.x - this.r) > 0 && (this.x + this.r) < canvas.width;
        let yBetween = (this.y - this.r) > 0 && (this.y + this.r) < canvas.height;
        return xBetween && yBetween;
    }

    move() {
        if (this.x - this.r < 0 || this.x + this.r > canvas.width) {
            this.xShift = this.xShift * -1;
        }
        if (this.y - this.r < 0 || this.y + this.r > canvas.height) {
            this.yShift = this.yShift * -1;
        }
        this.x += this.xShift;
        this.y += this.yShift;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }
}

function randInt(min, max) {
    let result = Math.floor(Math.random() * (max - min)) + min;
    return result;
}

function clearBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function getBall() {
    let randomBall = new Ball(randInt(0, 500), randInt(0, 500),
        randInt(10, 30), colors[randInt(0, colors.length)]);
    return randomBall;
}

function doesBallOverlapWitPrevBalls(arrBalls, someBall) {
    for (let i = 0; i < arrBalls.length; i++) {
        if (someBall.overlap(arrBalls[i])) {
            return true;
        }
    }
    return false;
}

function getBalls(howMany = 10) {
    let theBalls = [];
    let theBall;
    for (let i = 0; i < howMany; i++) {

        do {
            theBall = getBall();
        } while (doesBallOverlapWitPrevBalls(theBalls, theBall) ||
            !theBall.withinCanvas())

        theBalls.push(theBall);
    }
    return theBalls;
}

function drawBalls(balls) {
    clearBoard();
    for (let ball of balls) {
        ball.draw();
    }
}

function moveBalls(balls) {
    for (let i = 0; i < balls.length; i++) {
        balls[i].move();
        for (let j = i + 1; j < balls.length; j++) {
            if (balls[i].overlap(balls[j])) {
                balls[i].resolveCollision(balls[j]);
            }
        }
    }
}


balls = getBalls(10);

setInterval(() => {
    drawBalls(balls);
    moveBalls(balls);
}, 40);
