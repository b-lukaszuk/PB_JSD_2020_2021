import Piece from "./piece";
import { Color } from "../dataTypes/color";

class King extends Piece {

    public constructor(color: Color) {
        // king's ID: 7
        super(7, color, color === Color.Black ? "\u265a" : "\u2654");
    }

    /**
     * gets all possible moves for a king from a given position
     * king moves diag, vert-horiz, forward-backward, by 1 field from start
     * @param {number} row - Int: 0-7 (incl-incl), current position row
     * @param {number} col - Int: 0-7 (incl-incl), current position col
     * @returns {Array<Array<number>>} coordinates of possible moves
     */
    public getAllMoves(row: number, col: number): Array<Array<number>> {

        let positions: Array<Array<number>> = []; // result
        let viableShifts: Array<Array<number>>;
        viableShifts = this.getDiagShifts().concat(this.getHorAndVertShifts());
        let distance: number = 1;

        for (let aShift of viableShifts) {
            let move: Array<number> = [];
            move = [row + aShift[0] * distance, col + aShift[1] * distance];
            if (this.isMoveOk(move)) {
                positions.push(move);
            }
        }
        return positions;
    }
}

export default King;
