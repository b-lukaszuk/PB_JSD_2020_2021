import Piece from "./piece";
import { Color } from "../dataTypes/color";

class Pawn extends Piece {
    public constructor(color: Color) {
        // pawn's ID: 2
        super(2, color, color === Color.Black ? "\u265f" : "\u2659");
    }

    /**
     * gets all possible CAPTURING MOVES for a pawn from a given position
     * pawn captures on diagonals, only forward, 1 field ahead (1 from start)
     * @param {number} row - Int: 0-7 (incl-incl), current position row
     * @param {number} col - Int: 0-7 (incl-incl), current position col
     * @returns {Array<Array<number>>} coordinates of possible moves
     */
    public getAllMoves(row: number, col: number): Array<Array<number>> {

        let positions: Array<Array<number>> = []; // result
        let possibleShifts: Array<Array<number>> = this.getDiagShifts();
        let distance: number = 1;

        for (let aShift of possibleShifts) {
            let move: Array<number> = [];
            move = [row + aShift[0] * distance, col + aShift[1] * distance];
            if (this.isMoveOk(move)) {
                if (this.getColor() === Color.White && aShift[0] === 1) {
                    positions.push(move); // capturing row forward
                }
                if (this.getColor() === Color.Black && aShift[0] === -1) {
                    positions.push(move); // capturing row backward
                }
            }
        }
        return positions;
    }
}

export default Pawn;
