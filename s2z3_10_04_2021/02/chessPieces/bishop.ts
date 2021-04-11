import Piece from "./piece";

class Bishop extends Piece {

    public constructor(rowId: number, colId: number) {
        super(rowId, colId, 3);
        this.directions = [2, 5, 7, 10];
    }

    public toStr(): string {
        return " B ";
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

export default Bishop;
