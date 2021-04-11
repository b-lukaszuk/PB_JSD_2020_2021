import Piece from "./piece";

class Queen extends Piece {
    public constructor(rowId: number, colId: number) {
        super(rowId, colId, 6);
    }

    public toStr(): string {
        return " Q ";
    }
}

export default Queen;
