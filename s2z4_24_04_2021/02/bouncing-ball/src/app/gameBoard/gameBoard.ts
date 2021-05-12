import board from "./examInput";
import Point from "../point/point";
import Ball from "../point/ball";
import Brick from "../point/brick";
import MagicBrick from '../point/magicBrick';

class GameBoard {
    // internal representation of the chessBoard
    private _gameBoard: Point[][] = [];
    private _ball: Ball = new Ball(0, 0);

    // empty board initialization
    constructor() {
        this.initializeBoard();
    }

    public initializeBoard(): void {
        // may be invoked when the board is non empty
        this._gameBoard = [];

        for (let r = 0; r < board.length; r++) {
            let row: Point[] = [];
            for (let c = 0; c < board[r].length; c++) {
                if (board[r][c] === "X") {
                    row.push(new Brick(r, c));
                } else if (board[r][c] === "1") {
                    this._ball = new Ball(r, c);
                    row.push(this._ball);
                } else if (board[r][c] === "Y") {
                    row.push(new MagicBrick(r, c));
                } else {
                    row.push(new Point(r, c));
                }
            }
            this._gameBoard.push(row);
        }
    }

    public getGameBoard(): Point[][] {
        return this._gameBoard;
    }

    public getBall(): Ball {
        return this._ball;
    }

    /**
     * sets Point or its subclasses Ball and Brick at a given position
     * updates this._gameBoard
     */
    public setObjAtPos(obj: Point, pos: number[]): void {
        let [row, col] = pos;
        if (obj instanceof Ball) {
            this._ball = obj;
        }
        this._gameBoard[row][col] = obj;
    }

    public getContent(pos: number[]): Point {
        let [row, col] = pos;
        return this._gameBoard[row][col];
    }

    public getNCols(): number {
        // all rows are of equal length
        return this._gameBoard[0].length;
    }

    public getNRows(): number {
        return this._gameBoard.length;
    }
}

// singelton required by the task
const singelton = (function() {
    let instance: GameBoard; 	// no initialization so undefined

    function init() {
        return new GameBoard();
    }

    function getInstance(): GameBoard {
        if (!Boolean(instance)) {
            instance = init();
        }
        return instance;
    }

    return {
        getGameBoardInstance: getInstance
    }
})();

export { GameBoard, singelton };
