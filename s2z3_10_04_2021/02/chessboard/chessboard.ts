import None from "../chessPieces/none";
import Piece from "../chessPieces/piece";
import Pawn from "../chessPieces/pawn";
import Knight from "../chessPieces/knight";
import Bishop from "../chessPieces/bishop";
import Rook from "../chessPieces/rook";
import Queen from "../chessPieces/queen";
import King from "../chessPieces/king";
import rightPad from "../utils/rightPad";

class Chessboard {
    private _chessBoard: Array<Array<Piece>> = [];

    // initializes empty (type=0) or fully set (type=1) board
    constructor(type: number = 0) {
        for (let r = 0; r < 8; r++) {
            let chessBoardRow: Array<Piece> = [];
            if (type === 1 && (r === 0 || r === 7)) {
                chessBoardRow = [
                    new Rook(),
                    new Knight(),
                    new Bishop(),
                    new Queen(),
                    new King(),
                    new Rook(),
                    new Knight(),
                    new Bishop(),
                ];
                this._chessBoard.push(chessBoardRow);
                continue;
            } else if (type === 1 && (r === 1 || r === 6)) {
                chessBoardRow = [
                    new Pawn(),
                    new Pawn(),
                    new Pawn(),
                    new Pawn(),
                    new Pawn(),
                    new Pawn(),
                    new Pawn(),
                    new Pawn(),
                ];
                this._chessBoard.push(chessBoardRow);
                continue;
            }
            for (let c = 0; c < 8; c++) {
                chessBoardRow.push(new None());
            }
            this._chessBoard.push(chessBoardRow);
        }
    }

    /**
     * returns a value of a given field (class Piece)
     * @param {number} rowId - Int 0-7 (incl-incl)
     * @param {number} colId - Int 0-7 (incl-incl)
     * @returns {Piece} piece occupying the field (None for empty field)
     */
    public getField(rowId: number, colId: number): Piece {
        return this._chessBoard[rowId][colId];
    }

    /**
     * sets a field to a given Piece (None for empty field)
     * @param {number} rowId - Int 0-7 (incl-incl)
     * @param {number} colId - Int 0-7 (incl-incl)
     * @param {Field} piece - piece to put on field (None for empty field)
     */
    public setField(rowId: number, colId: number, piece: Piece): void {
        this._chessBoard[rowId][colId] = piece;
    }

    public mvPiece(rFrom: number, cFrom: number, rTo: number, cTo: number): void {
        this.setField(rTo, cTo, this.getField(rFrom, cFrom));
        this.setField(rFrom, cFrom, new None());
    }

    public print(): void {
        let fieldLen = this._chessBoard[0][0].toStr().length;
        let colSep = "|";
        let rowSepSingleCell = "+" + rightPad("-", fieldLen, "-");
        let rowSep =
            rightPad(
                rowSepSingleCell,
                8 * rowSepSingleCell.length,
                rowSepSingleCell
            ) + "+";
        console.log(rowSep);
        for (let row = 0; row < this._chessBoard.length; row++) {
            let rowToPrint = "|";
            for (let col = 0; col < this._chessBoard[row].length; col++) {
                rowToPrint += rightPad(
                    this._chessBoard[row][col].toStr(),
                    fieldLen,
                    " "
                );
                rowToPrint += colSep;
            }
            console.log(rowToPrint);
            console.log(rowSep);
        }
    }
}

new Chessboard().print();
console.log();
console.log();
new Chessboard(1).print();

export default Chessboard;
