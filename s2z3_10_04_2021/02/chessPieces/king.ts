import Piece from "./piece";

class King extends Piece {

    public constructor(rowId: number, colId: number) {
        super(rowId, colId, 7);
    }

    public toStr(): string {
        return " K ";
    }


    public getMoves(): Array<Array<number>> {
        const distance: number = 1;
        let result: Array<Array<number>> = [];
        for (let direction of this.directions) {
            let move: Array<number> = [];
            move = this.getMvNto(direction, distance);
            result.push(move);
        }
        return result;
    }
}

export default King;
