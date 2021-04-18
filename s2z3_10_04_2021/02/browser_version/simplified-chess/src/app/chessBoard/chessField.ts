import Piece from "../chessPieces/piece";
import { Color } from "../dataTypes/color";

class ChessField {

    /**
     * _value: 0 (empty field), 1 (move indicator) | Piece (occupied field)
     */
    public constructor(private _value: number | Piece,
        private _color: Color) {
    }

    /**
     * returns string indicator for middle of the field (empty, move or figure)
     */
    private getValAsStr(): string {
        switch (this._value) {
            case 0:
                return this._color === Color.Black ? "!" : " ";
            case 1:
                return "*";
            default:
                return this._value.toString();
        }
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
     * returns string of field contents
     */
    public toString(): string {
        let theString: string = " " + this.getValAsStr() + " ";
        if (this._color === Color.Black) {
            theString = "!" + this.getValAsStr() + "!";
        }
        return theString;
    }

    /**
     * sets field to 0 (empty), 1 (move indicator) or Piece
     */
    public setTo(what: number | Piece): void {
        this._value = what;
    }

    /**
     * returns value of a field
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
