import Piece from "./piece";

class Taken extends Piece {
    public constructor(rowId: number, colId: number) {
        super(rowId, colId, 8);
    }

    public toStr(): string {
        return " * ";
    }
}

export default Taken;
