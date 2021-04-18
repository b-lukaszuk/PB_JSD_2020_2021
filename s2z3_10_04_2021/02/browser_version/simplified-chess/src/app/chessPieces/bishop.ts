import Piece from "./piece";
import { Color } from "../dataTypes/color";

class Bishop extends Piece {

    public constructor(color: Color) {
        // bishop's ID: 4
        super(4, color, color === Color.Black ? "\u265d" : "\u2657");
    }

    /**
     * gets all possible moves for a bishop from a given position
     * bishop moves on diagonals, forward-backward, by upto 7 fields from start
     * @param {number} row - Int: 0-7 (incl-incl), current position row
     * @param {number} col - Int: 0-7 (incl-incl), current position col
     * @returns {Array<Array<number>>} coordinates of possible moves
     */
    public getAllMoves(row: number, col: number): Array<Array<number>> {

        let positions: Array<Array<number>> = []; // result
        let viableShifts: Array<Array<number>> = this.getDiagShifts();

        for (let aShift of viableShifts) {
            for (let distance = 1; distance < 8; distance++) {
                let move: Array<number> = [];
                move = [row + aShift[0] * distance, col + aShift[1] * distance];
                if (this.isMoveOk(move)) {
                    positions.push(move);
                }
            }
        }
        return positions;
    }
}

export default Bishop;
