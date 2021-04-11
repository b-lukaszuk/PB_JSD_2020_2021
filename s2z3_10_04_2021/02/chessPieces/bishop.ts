import Piece from "./piece";

class Bishop extends Piece {
    public constructor(rowId: number, colId: number) {
        super(rowId, colId, 3);
    }

    public toStr(): string {
        return " B ";
    }
}

export default Bishop;
