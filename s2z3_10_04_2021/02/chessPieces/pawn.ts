import Piece from "./piece";

class Pawn extends Piece {
    public constructor() {
        // pawn's ID: 1
        super(1);
    }

    /**
     * gets all possible CAPTURING MOVES for a pawn from a given position
     * pawn captures on diagonals, only forward, 1 field ahead (1 from start)
     * @param {number} row - Int: 0-7 (incl-incl), current position row
     * @param {number} col - Int: 0-7 (incl-incl), current position col
     * @param {boolean} zeroToSeven - direction of move for a pawn
     * @returns {Array<Array<number>>} coordinates of possible moves
     */
    public getAllMoves(row: number, col: number, zeroToSeven: boolean):
        Array<Array<number>> {

        let positions: Array<Array<number>> = []; // result
        let possibleShifts: Array<Array<number>> = this.getDiagShifts();
        let distance: number = 1;

        for (let aShift of possibleShifts) {
            let move: Array<number> = [];
            move = [row + aShift[0] * distance, col + aShift[1] * distance];
            if (this.isMoveOk(move)) {
                if (zeroToSeven && aShift[0] === 1) {
                    positions.push(move); // capturing row forward
                }
                if (!zeroToSeven && aShift[0] === -1) {
                    positions.push(move); // capturing row backward
                }
            }
        }
        return positions;
    }
}

export default Pawn;
