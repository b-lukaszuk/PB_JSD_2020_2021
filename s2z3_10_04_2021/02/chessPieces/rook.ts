import Piece from "./piece";

class Rook extends Piece {
    public constructor(rowId: number, colId: number) {
        super(rowId, colId, 5);
    }

    public toStr(): string {
        return " R ";
    }
}

export default Rook;
