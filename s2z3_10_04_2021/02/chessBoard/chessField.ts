import Bishop from "../chessPieces/bishop";
import King from "../chessPieces/king";
import Knight from "../chessPieces/knight";
import Pawn from "../chessPieces/pawn";
import Piece from "../chessPieces/piece";
import Queen from "../chessPieces/queen";
import Rook from "../chessPieces/rook";
import { Color } from "../dataTypes/color";

class ChessField {

    public constructor(private _row: number, private _col: number,
        private _value: number | Piece, private _color: Color) {
    }

    /**
     * returns string of field contents
     */
    public toString(): string {
        let theString: string = "   ";
        if (this._color === Color.Black) {
            theString = "###";
        }
        return theString;
    }
}

export default ChessField;
