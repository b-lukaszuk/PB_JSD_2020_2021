import { Component } from '@angular/core';

// GameBoard imported only for better autocompletion
// consider removing it after everything is done;
import { singelton, GameBoard } from './gameBoard/gameBoard';
import areArraysEqual from './utils/arraysComparator';
import isBetween from './utils/betweenTwoNums';
import Point from "./point/point";
import Ball from "./point/ball";
import Brick from "./point/brick";
import MagicBrick from './point/magicBrick';

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

    public getClassForField(pos: number[]): string {
        if (this.gameBoard.getContent(pos) instanceof MagicBrick) {
            return "magicBrick";
        } else if (this.gameBoard.getContent(pos) instanceof Brick) {
            return "boarder";
        } else if (this.gameBoard.getContent(pos) instanceof Ball) {
            return "ball";
        } else {
            return "empty";
        }
    }

    /**
     * detects collisions of someBall position with the walls of gameBoard
     * changes this.shift X and/or Y coordinate (negates it)
     */
    public collisionDetection(someBall: Ball): void {
        // if ball is off the board, change the shift
        if (!someBall.isXBetween(1, this.gameBoard.getNRows() - 2)) {
            this.shift.setX(this.shift.getX() * -1);
        }
        if (!someBall.isYBetween(1, this.gameBoard.getNCols() - 2)) {
            this.shift.setY(this.shift.getY() * -1);
        }
    }

    public moveBallByOneField(): void {
        let curBall: Ball = this.gameBoard.getBall();
        let [bRow, bCol] = curBall.getPos();
        // where the ball will be after the shift
        let newBall: Ball = curBall.add(this.shift);

        this.collisionDetection(newBall);

        // re-create newBall in case the shift has changed after collision
        newBall = curBall.add(this.shift);

        this.gameBoard.setObjAtPos(new Point(bRow, bCol), [bRow, bCol]);
        this.gameBoard.setObjAtPos(newBall, newBall.getPos());

        this.shouldBallBeStopped = newBall.equal(this.initialBall);
    }

    // public indexOfVector(vector: number[], arrOfVects: number[][]): number {

    public initializeGameBoard(): void {
        this.gameBoard.initializeBoard();
    }

    /**
     * sets ball into motion
     * sets this.internalId = to interval id from setInterval
     * that it uses internally
     */
    public setBallIntoMotion() {
        let intervalId = setInterval(() => {
            this.moveBallByOneField();
            if (this.shouldBallBeStopped) {
                this.stopTheBall();
            }
        }, 200);
        this.intervalId = intervalId;
    }

    public stopTheBall() {
        clearInterval(this.intervalId);
    }

    ngOnInit() {
        this.initializeGameBoard();
    }


}
