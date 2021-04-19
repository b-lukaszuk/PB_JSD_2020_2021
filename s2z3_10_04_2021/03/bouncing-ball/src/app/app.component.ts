import { Component } from '@angular/core';

// GameBoard imported only for better autocompletion
// consider removing it after everything is done;
import { singelton, GameBoard } from './gameBoard/gameBoard';
import areArraysEqual from './utils/arraysComparator';
import isBetween from './utils/betweenTwoNums';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    public title: string = 'bouncing-ball';
    public gameBoard: GameBoard = singelton.getGameBoardInstance();
    public ballStartPos: number[] = [5, 4];
    public ballCurPos: number[] = this.ballStartPos;
    public ballCurShift: number[] = [1, 1];
    public intervalId: any;
    public shouldBallBeStopped: boolean = false;

    public shiftBallBy(shiftVect: number[]): number[] {
        let [currRow, currCol] = [...this.ballCurPos];
        let [sRow, sCol] = [...shiftVect];
        return [currRow + sRow, currCol + sCol];
    }

    public moveBall(): void {
        this.ballCurShift = this.getNextShiftVector();
        this.ballCurPos = this.shiftBallBy(this.ballCurShift);
        this.gameBoard.setEmptyBoard();
        this.gameBoard.setBallAtPos(this.ballCurPos);
        if (areArraysEqual(this.ballCurPos, this.ballStartPos)) {
            this.shouldBallBeStopped = true;
        }
    }

    public indexOfVector(vector: number[], arrOfVects: number[][]): number {
        for (let i = 0; i < arrOfVects.length; i++) {
            if (areArraysEqual(vector, arrOfVects[i])) {
                return i;
            }
        }
        return -1;
    }

    public getNextShiftVector(): number[] {
        let [shiftRow, shiftCol] = [...this.ballCurShift];
        let [nextRow, nextCol] = this.shiftBallBy(this.ballCurShift);
        let [lowerLimit, upperLimit] = [0, 9];
        if (!isBetween(nextRow, lowerLimit, upperLimit)) {
            shiftRow *= -1; 	// negate it
        }
        if (!isBetween(nextCol, lowerLimit, upperLimit)) {
            shiftCol *= -1; 	// negate it
        }
        return [shiftRow, shiftCol];
    }

    public setEmptyGameBoard(): void {
        this.gameBoard.setEmptyBoard();
    }

    public getValAtPos(row: number, col: number): number {
        return this.gameBoard.getVal(row, col);
    }

    public setBallValAtPos(pos: number[]): void {
        this.gameBoard.setBallAtPos(pos);
    }

    /**
     * sets ball into motion
     * sets this.internalId = to interval id from setInterval
     * that it uses internally
     */
    public setBallIntoMotion() {
        let intervalId = setInterval(() => {
            this.moveBall();
            if (this.shouldBallBeStopped) {
                this.stopTheBall();
            }
        }, 500);
        this.intervalId = intervalId;
    }

    public stopTheBall() {
        clearInterval(this.intervalId);
    }

    ngOnInit() {
        this.setEmptyGameBoard();
        this.setBallValAtPos(this.ballStartPos);
    }


}
