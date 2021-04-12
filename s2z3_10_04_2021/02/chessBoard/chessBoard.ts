import Bishop from "../chessPieces/bishop";
import ChessField from "./chessField";
import King from "../chessPieces/king";
import Knight from "../chessPieces/knight";
import Pawn from "../chessPieces/pawn";
import Piece from "../chessPieces/piece";
import Queen from "../chessPieces/queen";
import Rook from "../chessPieces/rook";
import rightPad from "../utils/rightPad";
import { Color, toggleColor } from "../dataTypes/color";

class Chessboard {
    private _chessBoard: Array<Array<ChessField>> = [];
    private _corrPiecesPos: boolean = true; // flag
    private _possibleCaptures: Array<Array<number>> = [];

    // initializes empty chessboard
    constructor() {
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
     * returns info about correct or not position of chessboard
     */
    public isCorPosition() {
        return this._corrPiecesPos;
    }

    /**
     * returns array of possible captures
     * does not make copy of _possibleCaptures
     * so do not modify
     */
    public getPossibleCaptures(): Array<Array<number>> {
        return this._possibleCaptures;
    }

    /**
     * updates fields with move indicators Field value 1
     * only if the field is empty
     */
    private updateFieldIndicators(positions: Array<Array<number>>): void {
        for (let position of positions) {
            let pRow: number, pCol: number;
            [pRow, pCol] = position;
            if (this._chessBoard[pRow][pCol].getVal() === 0) {
                this._chessBoard[pRow][pCol].setTo(1);
            }
            if (this._chessBoard[pRow][pCol].getVal() instanceof Piece) {
                this._possibleCaptures.push([pRow, pCol]);
            }
        }
    }

    /**
     * sets a field at 0 some value
     * updates flag _corrPiecesPos while setting;
     */
    public setAtPos(row: number, col: number, what: number | Piece) {

        let possibleMoves: Array<Array<number>> = [];
        if (what instanceof Piece) {
            possibleMoves = what.getAllMoves(row, col);
        }

        this._chessBoard[row][col].setTo(what);
        this.updateFieldIndicators(possibleMoves);

        if (what instanceof Pawn) { // check for correct pawn position
            this._corrPiecesPos = !this.isPawnOnFirstOrLastRow();
        }
        if (what instanceof King) {
            // king moves one field in every direction
            // no other king is allowed to allready stand there
            for (let position of possibleMoves) {
                let pRow: number, pCol: number;
                [pRow, pCol] = position;
                if (this._chessBoard[pRow][pCol].getVal() instanceof King) {
                    this._corrPiecesPos = false;
                    break;
                }
            }
        }
    }

    /**
     * pawns start from second row
     * pawns on the first or last row gets promoted (oppowite side)
     * (and won't be a pawn anymore)
     */
    private isPawnOnFirstOrLastRow(): boolean {
        let onFirstRow: boolean = this._chessBoard[0].some((field) => {
            return field.getVal() instanceof Pawn;
        })
        let onLastRow: boolean = this._chessBoard[7].some((field) => {
            return field.getVal() instanceof Pawn;
        })
        return onFirstRow || onLastRow;
    }

    // prints current chessboard state
    public print(): void {
        let fieldLen: number = this._chessBoard[0][0].toString().length;
        let colSep: string = "|";
        let rowSepSingleCell: string = "+" + rightPad("-", fieldLen, "-");
        let rowSep: string =
            rightPad(
                rowSepSingleCell,
                8 * rowSepSingleCell.length,
                rowSepSingleCell
            ) + "+";
        console.log(rowSep);
        for (let row = 0; row < this._chessBoard.length; row++) {
            let rowToPrint: string = "|";
            for (let col = 0; col < this._chessBoard[row].length; col++) {
                rowToPrint += this._chessBoard[row][col].toString();
                rowToPrint += colSep;
            }
            console.log(rowToPrint);
            console.log(rowSep);
        }
    }
}

let x: Chessboard = new Chessboard();
x.setAtPos(6, 1, new Queen(Color.White));
x.setAtPos(3, 4, new King(Color.Black));
x.print();
console.log("Possible captures (none if empty): ");
console.log(x.getPossibleCaptures());

export default Chessboard;
