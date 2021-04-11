import Piece from "./piece";

class Knight extends Piece {
    public constructor(rowId: number, colId: number) {
        super(rowId, colId, 2);
    }

    public toStr(): string {
        return " N ";
    }
}

export default Knight;
