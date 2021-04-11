import Piece from "./piece";

class Knight extends Piece {
    public constructor(rowId: number, colId: number) {
        super(rowId, colId, 2);
    }

    public toStr(): string {
        return " N ";
    }

    public getMoves(): Array<Array<number>> {
        let result: Array<Array<number>> = this.goToLs();
        return result;
    }
}

export default Knight;
