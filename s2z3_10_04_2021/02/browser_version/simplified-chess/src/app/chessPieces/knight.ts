import Piece from "./piece";
import { Color } from "../dataTypes/color";

class Knight extends Piece {
    public constructor(color: Color) {
        // knight's ID: 3
        super(3, color, color === Color.Black ? "\u265e" : "\u2658");
    }

    /**
     * gets all possible moves for a knight from a given position
     * knight moves L-Shaped 2 fields in one direction and 1 field in the other
     * @param {number} row - Int: 0-7 (incl-incl), current position row
     * @param {number} col - Int: 0-7 (incl-incl), current position col
     * @returns {Array<Array<number>>} coordinates of possible moves
     */
    public getAllMoves(row: number, col: number): Array<Array<number>> {
        let positions: Array<Array<number>> = []; // result
        let possibleShifts: Array<Array<number>> = this.getLShapedShifts();
        let distance: number = 1;
        for (let aShift of possibleShifts) {
            let move: Array<number> = [];
            move = [row + aShift[0] * distance, col + aShift[1] * distance];
            if (this.isMoveOk(move)) {
                positions.push(move);
            }
        }
        return positions;
    }
}

export default Knight;
