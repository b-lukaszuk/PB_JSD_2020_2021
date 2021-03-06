import areArraysEqual from "../utils/arraysComparator";
import ChessField from "./chessField";
import King from "../chessPieces/king";
import Pawn from "../chessPieces/pawn";
import Piece from "../chessPieces/piece";
import rightPad from "../utils/rightPad";
import { Color, toggleColor } from "../dataTypes/color";

class Chessboard {
    // internal representation of the chessBoard
    private _chessBoard: Array<Array<ChessField>> = [];
    // possible moves of pieces on chessboard
    private _viableMovesPositions: Array<Array<number>> = [];
    // possible captures by any piece at the board
    private _viableCapturesPositions: Array<Array<number>> = [];
    private _piecesOnBoardPositions: Array<Array<number>> = [];

    private _corrPiecesPos: boolean = true; // flag, for correct board setting

    // empty board initialization
    constructor() {
        this.setEmptyBoard();
    }

    public setEmptyBoard(): void {
        this._chessBoard = [];
        this._viableMovesPositions = [];
        this._viableCapturesPositions = [];
        this._piecesOnBoardPositions = [];
        this._corrPiecesPos = true; // flag, for correct board setting

        let curColor: Color = Color.Black;
        for (let r = 0; r < 8; r++) {
            let chessBoardRow: Array<ChessField> = [];
            for (let c = 0; c < 8; c++) {
                chessBoardRow.push(new ChessField(0, curColor));
                curColor = toggleColor(curColor);
            }
            // first field of the next row starts with the same color
            // as the last field of the previous row
            curColor = toggleColor(curColor);
            this._chessBoard.push(chessBoardRow);
        }
    }

    /**
     * returns info about correct or incorrect position on the chessboard
     */
    public isCorrPositionOnBoard(): boolean {
        return this._corrPiecesPos;
    }

    /**
     * returns array of possible captures
     * does not make (deep) copy of _viableCapturesPositions
     * so do not modify
     */
    public getPossibleCaptures(): Array<Array<number>> {
        this.updateViableCapturePositions(); // sets _viableCapturesPositions
        return this._viableCapturesPositions;
    }

    /**
     * updates fields with move indicators (Field value 1) if the field is empty
     */
    private updateMovesIndicators(movesPositions: Array<Array<number>>): void {
        for (let position of movesPositions) {
            let pRow: number, pCol: number;
            [pRow, pCol] = position;
            if (this._chessBoard[pRow][pCol].getVal() === 0) {
                this._chessBoard[pRow][pCol].setTo(1);
            }
        }
    }

    /**
     * updates this._viableCapturesPositions by new moves positions
     */
    private updateViableMovesPositions(
        newMovesPositions: Array<Array<number>>
    ): void {
        if (this._viableMovesPositions.length === 0) {
            this._viableMovesPositions = newMovesPositions;
        } else {
            this._viableMovesPositions = this._viableMovesPositions.concat(
                newMovesPositions);
        }
    }

    /**
     * checks for positions [r1, c1] and [r2, c2] equality, e.g.
     * r1 === r2 && c1 === c2
     */
    private arePositionsEql(pos1: Array<number>, pos2: Array<number>): boolean {
        return areArraysEqual(pos1, pos2);
    }

    private updateViableCapturePositions(): void {
        for (let i = 0; i < this._piecesOnBoardPositions.length; i++) {
            for (let j = 0; j < this._viableMovesPositions.length; j++) {
                if (this.arePositionsEql(
                    this._piecesOnBoardPositions[i],
                    this._viableMovesPositions[j])) {
                    this._viableCapturesPositions.push(
                        this._piecesOnBoardPositions[i]
                    );
                }
            }
        }
    }

    /**
     * king moves one field in every direction
     * opponent's king is not allowed to allready stand there
     */
    private isKingCollidingWithOtherKing(row: number, col: number,
        king: King): boolean {

        let kingsMovesPos: Array<Array<number>> = king.getAllMoves(row, col);

        // checking for otehr king standing within a move/field distance
        for (let position of kingsMovesPos) {
            let pRow: number, pCol: number;
            [pRow, pCol] = position;
            if (this._chessBoard[pRow][pCol].getVal() instanceof King) {
                console.log("kings collision detected");
                return true;
            }
        }
        return false;
    }

    /**
     * sets a field at some value (0 - empty, 1 - move indicator, Piece)
     * updates this._corrPiecesPos
     */
    public setAtPos(row: number, col: number, what: number | Piece) {

        let thePiecePossibleMoves: Array<Array<number>> = [];

        if (what instanceof Piece) {
            thePiecePossibleMoves = what.getAllMoves(row, col);
            this.updateViableMovesPositions(thePiecePossibleMoves);
        }
        if (what instanceof King) {
            // change only if previously this._corPiecesPos was correct (true)
            // prevents accidental overwrite of false with true
            if (this._corrPiecesPos) {
                this._corrPiecesPos = !this.isKingCollidingWithOtherKing(
                    row,
                    col,
                    what
                );
            }
        }
        if (what instanceof Pawn) {
            // change only if previously this._corPiecesPos was correct (true)
            // prevents accidental overwrite of false with true
            if (this._corrPiecesPos) {
                // pawns start from 2nd row, and are promoted at last row
                this._corrPiecesPos = row !== 0 && row !== 7;
            }
        }

        this._chessBoard[row][col].setTo(what);
        this._piecesOnBoardPositions.push([row, col]);
        this.updateMovesIndicators(thePiecePossibleMoves);
    }

    /**
     * returns positions of all the pieces on chessBoard
     * helps with testing (easier to locate a piece on the printed chessBoard)
     * doesn't return a copy of the private field, so do not modify the result
     */
    public getPiecesOnBoardPositions(): Array<Array<number>> {
        return this._piecesOnBoardPositions;
    }

    // prints current chessboard state
    public print(): void {
        let fieldLen: number = this._chessBoard[0][0].toString().length;
        let colSep: string = "|";
        let rowSepSingleCell: string = "+" + rightPad("-", fieldLen, "-");
        let rowSep: string = " " +
            rightPad(
                rowSepSingleCell,
                8 * rowSepSingleCell.length,
                rowSepSingleCell
            ) + "+";
        console.log("   0   1   2   3   4   5   6   7  "); // cols numbering
        console.log(rowSep);
        for (let row = 0; row < this._chessBoard.length; row++) {
            let rowToPrint: string = row + "|"; // row numbering on left
            for (let col = 0; col < this._chessBoard[row].length; col++) {
                rowToPrint += this._chessBoard[row][col].toString();
                rowToPrint += colSep;
            }
            console.log(rowToPrint);
            console.log(rowSep);
        }
    }
}

// singelton required by the task
const singelton = (function() {
    let instance: Chessboard; 	// no initialization so undefined

    function init() {
        return new Chessboard();
    }

    function getInstance(): Chessboard {
        if (!Boolean(instance)) {
            instance = init();
        }
        return instance;
    }

    return {
        getChessBoardInstance: getInstance
    }
})();

export default singelton;
