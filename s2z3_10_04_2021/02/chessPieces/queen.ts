import Piece from "./piece";
import { Color } from "../dataTypes/color";

class Queen extends Piece {
    public constructor(color: Color) {
        // queen's ID: 6
        super(6, color, "q");
    }

    /**
     * gets all possible moves for a bishop from a given position
     * queen moves diag, vert-horiz, forward-backward, upto 7 fields from start 
     * @param {number} row - Int: 0-7 (incl-incl), current position row
     * @param {number} col - Int: 0-7 (incl-incl), current position col
     * @returns {Array<Array<number>>} coordinates of possible moves
     */
    public getAllMoves(row: number, col: number): Array<Array<number>> {

        let positions: Array<Array<number>> = []; // result
        let viableShifts: Array<Array<number>>;
        viableShifts = this.getDiagShifts().concat(this.getHorAndVertShifts());

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

export default Queen;
