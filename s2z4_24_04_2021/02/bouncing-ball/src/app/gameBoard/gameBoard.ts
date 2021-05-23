import board from './examInput';
import Point from '../point/point';
import Ball from '../point/ball';
import Brick from '../point/brick';
import MagicBrick from '../point/magicBrick';
import isBetween from '../utils/betweenTwoNums';

class GameBoard {
    private _gameBoard: Point[][] = [];
    private _ball: Ball = new Ball(0, 0);

    constructor() {
        this.initializeBoard();
    }

    // initialize board with required in task pattern
    public initializeBoard(): void {
        this._gameBoard = [];

        for (let r = 0; r < board.length; r++) {
            let row: Point[] = [];
            for (let c = 0; c < board[r].length; c++) {
                if (board[r][c] === 'X') {
                    row.push(
                        new Brick(r, c, this.shouldLimitX([r, c]),
                            this.shouldLimitY([r, c]))
                    );
                } else if (board[r][c] === '1') {
                    this._ball = new Ball(r, c);
                    row.push(this._ball);
                } else if (board[r][c] === 'Y') {
                    row.push(new MagicBrick(r, c));
                } else {
                    row.push(new Point(r, c));
                }
            }
            this._gameBoard.push(row);
        }
    }

    /**
     * @param {number} axis0or1 - like in Python, 0 - x, 1 - y
     */
    private laysOnEdge(pos: number[], axis0or1: number): boolean {
        let upTo: number;
        upTo = axis0or1 === 0 ? (board.length - 2) : (board[0].length - 2);
        let result: boolean = !isBetween(pos[axis0or1], 1, upTo);
        return result;
    }

    private shouldLimitX(curBrickPos: number[]): boolean {
        let laysOnXEdge: boolean = false, laysOnYEdge: boolean = false;
        let neighboursWithBrick: boolean = false;
        laysOnXEdge = this.laysOnEdge(curBrickPos, 0)
        laysOnYEdge = this.laysOnEdge(curBrickPos, 1);
        if (laysOnXEdge) {
            return true;
        } else if (!laysOnYEdge) {
            neighboursWithBrick = this.isBrickOneShiftOnXaxis(curBrickPos);
            if (neighboursWithBrick) {
                return true;
            }
        }
        return false;
    }

    private shouldLimitY(curBrickPos: number[]): boolean {
        let laysOnXEdge: boolean = false, laysOnYEdge: boolean = false;
        let neighboursWithBrick: boolean = false;
        laysOnXEdge = this.laysOnEdge(curBrickPos, 0);
        laysOnYEdge = this.laysOnEdge(curBrickPos, 1);
        if (laysOnYEdge) {
            return true;
        } else if (!laysOnXEdge) {
            neighboursWithBrick = this.isBrickOneShiftOnYaxis(curBrickPos);
            if (neighboursWithBrick) {
                return true;
            }
        }
        return false;
    }

    private isBrickOneShiftOnXaxis(curBrickPos: number[]): boolean {
        let gotBrickOnLeft: boolean = false, gotBrickOnRight: boolean = false;
        let [cX, cY] = curBrickPos;
        if (isBetween(cX, 1, board.length)) {
            gotBrickOnLeft = board[cX - 1][cY] === 'X';
            gotBrickOnRight = board[cX + 1][cY] === 'X';
        }
        return gotBrickOnLeft || gotBrickOnRight;
    }

    private isBrickOneShiftOnYaxis(curBrickPos: number[]): boolean {
        let gotBrick1Up: boolean = false, gotBrick1Down: boolean = false;
        let [cX, cY] = curBrickPos;;
        if (isBetween(cY, 1, board[0].length - 2)) {
            gotBrick1Up = board[cX][cY - 1] === 'X';
            gotBrick1Down = board[cX][cY + 1] === 'X';
        }
        return gotBrick1Up || gotBrick1Down;
    }

    public getGameBoard(): Point[][] {
        return this._gameBoard;
    }

    public getBall(): Ball {
        return this._ball;
    }

    /**
     * gets obj (Point) coordinates and sets it there at this._gameBoard
     */
    public setObjAtBoard(obj: Point): void {
        let [row, col] = obj.getPos();
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

const singelton = (function() {
    let instance: GameBoard; // no initialization so undefined

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
        getGameBoardInstance: getInstance,
    };
})();

export { GameBoard, singelton };
