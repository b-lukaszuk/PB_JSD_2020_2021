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

    public setAtPos(row: number, col: number, what: number | Piece) {
        this._chessBoard[row][col].setTo(what);
    }

    /**
     * pawns on the first or last row gets promoted
     * (and won't be a pawn anymore)
     */
    private pawnOnFirstOrLastRow(): boolean {
        let onFirstRow: boolean = this._chessBoard[0].some((field) => {
            return field instanceof Pawn;
        })
        let onLastRow: boolean = this._chessBoard[7].some((field) => {
            return field instanceof Pawn;
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
x.setAtPos(3, 3, new Queen(Color.White));
x.setAtPos(0, 0, new Queen(Color.Black));
x.setAtPos(1, 1, 1);
x.setAtPos(1, 0, 1);
x.print();

export default Chessboard;
