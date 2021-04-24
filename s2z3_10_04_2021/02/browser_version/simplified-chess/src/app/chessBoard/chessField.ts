import Piece from "../chessPieces/piece";
import { Color } from "../dataTypes/color";

class ChessField {

    /**
     * _value: 0 (empty field), 1 (move indicator) | Piece (occupied field)
     */
    public constructor(private _value: number | Piece,
        private _color: Color) {
    }

    public getFieldColorAsString(): string {
        return this._color === Color.Black ? "black" : "white";
    }

    public getFieldValAsNum(): number {
        if (this._value instanceof Piece) {
            return this._value.getValue();
        }
        return this._value;
    }

    /**
     * sets field to 0 (empty), 1 (move indicator) or Piece
     */
    public setTo(what: number | Piece): void {
        this._value = what;
    }

    /**
     * returns value of a field number or Piece
     */
    public getVal(): number | Piece {
        return this._value;
    }

    /**
     * returns value of a field as a string
     */
    public getValAsString(): string {
        if (this._value instanceof Piece) {
            return this._value.toString();
        } else if (this._value === 1) {
            return "\u2739"; 	// filled star symbol
        }
        return "";
    }

}

export default ChessField;
