import { Component } from '@angular/core';

// GameBoard imported only for better autocompletion
// consider removing it after everything is done;
import { singelton, GameBoard } from './gameBoard/gameBoard';
import isBetween from './utils/betweenTwoNums';
import Point from "./point/point";
import Ball from "./point/ball";
import Brick from "./point/brick";
import randInt from "./utils/randInt";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    public title: string = 'bouncing-ball';
    public gameBoard: GameBoard = singelton.getGameBoardInstance();
    public shift: Point = new Point(1, 1);
    public initialBall: Ball = this.gameBoard.getBall();
    public intervalId: any;
    public shouldBallBeStopped: boolean = false;
    public gameStarted: boolean = false;

    public getClassForField(pos: number[]): string {
        if (this.gameBoard.getContent(pos) instanceof Brick) {
            return "boarder";
        } else if (this.gameBoard.getContent(pos) instanceof Ball) {
            return "ball";
        } else {
            return "empty";
        }
    }

    private collisionOnAxis(pos: number[], axis: 'x' | 'y'): boolean {
        if (axis === 'x') {
            return !isBetween(pos[0], 1, this.gameBoard.getNRows() - 2);
        } else {
            return !isBetween(pos[1], 1, this.gameBoard.getNCols() - 2);
        }
    }

    private collisionOnAnyAxis(pos: number[]): boolean {
        return this.collisionOnAxis(pos, 'x') || this.collisionOnAxis(pos, 'y');
    }

    public changeShift(option: number): void {
        switch (option) {
            case 1:
                this.shift = new Point(-1, -1);
                break;
            case 2:
                this.shift = new Point(-1, 1);
                break;
            case 3:
                this.shift = new Point(1, -1);
                break;
            default:
                this.shift = new Point(1, 1);
                break;
        }
    }

    /**
     * detects collisions of someBall position with the walls of gameBoard
     * changes this.shift X and/or Y coordinate (negates it)
     */
    private changeShiftIfCollision(someBall: Ball): void {
        if (this.collisionOnAxis(someBall.getPos(), 'x')) {
            this.shift.setX(this.shift.getX() * -1);
        }
        if (this.collisionOnAxis(someBall.getPos(), 'y')) {
            this.shift.setY(this.shift.getY() * -1);
        }
    }

    private getBallAtWithItsXYRandom(): Ball {
        let newX: number = randInt(1, this.gameBoard.getNRows() - 1);
        let newY: number = randInt(1, this.gameBoard.getNCols() - 1);
        return new Ball(newX, newY);
    }

    public setStartingBallAtRandomPosition(): void {
        let curBall: Ball = this.gameBoard.getBall();
        let newBall: Ball;
        do {
            newBall = this.getBallAtWithItsXYRandom()
        } while (curBall.equalPosition(newBall))
        this.gameBoard.setObjAtBoard(new Point(curBall.getX(), curBall.getY()));
        this.gameBoard.setObjAtBoard(newBall);
        this.initialBall = newBall;
    }

    private moveBallByOneField(): void {
        let curBall: Ball = this.gameBoard.getBall();
        let [bRow, bCol] = curBall.getPos();
        let newBall: Ball; // where ball will be in the next move

        do {
            newBall = curBall.add(this.shift);
            this.changeShiftIfCollision(newBall);
        } while (this.collisionOnAnyAxis(newBall.getPos()))

        this.gameBoard.setObjAtBoard(new Point(bRow, bCol));
        this.gameBoard.setObjAtBoard(newBall);

        this.shouldBallBeStopped = newBall.equalPosition(this.initialBall);
    }

    public initializeGameBoard(): void {
        this.gameBoard.initializeBoard();
    }

    /**
     * sets ball into motion
     * sets this.internalId = to interval id from setInterval
     * that it uses internally
     */
    public setBallIntoMotion(): void {
        let intervalId = setInterval(() => {
            this.gameStarted = true;
            this.moveBallByOneField();
            if (this.shouldBallBeStopped) {
                this.stopTheBall();
            }
        }, 200);
        this.intervalId = intervalId;
    }

    public stopTheBall(): void {
        clearInterval(this.intervalId);
    }

    ngOnInit() {
        this.initializeGameBoard();
    }


}
