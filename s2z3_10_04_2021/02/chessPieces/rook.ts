import Piece from "./piece";

class Rook extends Piece {
    public constructor(rowId: number, colId: number) {
        super(rowId, colId, 5);
        this.directions = [12, 3, 6, 9];
    }

    public toStr(): string {
        return " R ";
    }

    public getMoves(): Array<Array<number>> {
        let result: Array<Array<number>> = [];
        for (let direction of this.directions) {
            for (let dist = 1; dist <= 8; dist++) {
                let move: Array<number> = [];
                move = this.getMvNto(direction, dist);
                result.push(move);
            }
        }
        return result;
    }
}

export default Rook;
