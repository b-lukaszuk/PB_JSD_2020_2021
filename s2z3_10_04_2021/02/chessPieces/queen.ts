import Piece from "./piece";

class Queen extends Piece {
    public constructor(rowId: number, colId: number) {
        super(rowId, colId, 6);
    }

    public toStr(): string {
        return " Q ";
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

export default Queen;
