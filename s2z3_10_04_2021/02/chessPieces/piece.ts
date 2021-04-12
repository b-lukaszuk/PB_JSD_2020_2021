class Piece {
    private _value: number;

    /**
     * IDs:
     * 1 - pawn, 2 - knight
     * 3 - bishop, 5 - rook
     * 6 - queen, 7 - king
     * @param {number} value - ID of a piece
     */
    public constructor(value: number) {
        this._value = value;
    }

    /**
     * checks if coordinates are in a chessboard (r/c from 0-7)
     * @param {Array<number>} coords [row, col]
     * @returns {boolean} are both coords within 0-7 (incl-incl)
     */
    protected isMoveOk(coords: Array<number>): boolean {
        for (let coord of coords) {
            if (coord < 0 || coord > 7) {
                return false;
            }
        }
        return true;
    }

    /**
     * shifts by 1 field for diagonal moves in all directions
     * to be overlayed on piece position [row, col]
     * DIAG.: all configurations of +/-1 in [row or col]
     * @returns {Array<Array<number>>} shifts by 1 field for diagonal moves
     */
    protected getDiagShifts(): Array<Array<number>> {
        let choices: Array<number> = [-1, 1];
        let diagShifts: Array<Array<number>> = [];
        for (let num1 of choices) {
            for (let num2 of choices) {
                diagShifts.push([num1, num2]);
            }
        }
        return diagShifts;
    }

    /**
     * shifts by 1 field for horizontal and vertical moves in all directions
     * to be overlayed on piece position [row, col]
     * hor/vert.: all configurations of +/-1 and 0
     * @returns {Array<Array<number>>} shifts by 1 field for hor/vert moves
     */
    protected getHorAndVertShifts(): Array<Array<number>> {
        let choices: Array<number> = [-1, 1, 0];
        let horAndVertShifts: Array<Array<number>> = [];
        for (let num1 of choices) {
            for (let num2 of choices) {
                // must be +/-1 with 0 (heterogenous config)
                if (Math.abs(num1) !== Math.abs(num2)) {
                    horAndVertShifts.push([num1, num2]);
                }
            }
        }
        return horAndVertShifts;
    }

    /**
     * shifts by 1 move for L-shaped moves (knight)
     * to be overlayed on piece position [row, col]
     * L-shape: all configurations of +/-2 and +/-1
     * @returns {Array<Array<number>>} shifts by 1 move for knight
     */
    protected getLShapedShifts(): Array<Array<number>> {
        let choices: Array<number> = [-2, 2, -1, 1];
        let lShapedShifts: Array<Array<number>> = [];
        for (let num1 of choices) {
            for (let num2 of choices) {
                // must be +/-2 with +/-1 (heterogenous config)
                if (Math.abs(num1) !== Math.abs(num2)) {
                    lShapedShifts.push([num1, num2]);
                }
            }
        }
        return lShapedShifts;
    }

    public getValue() {
        return this._value;
    }
}

export default Piece;
