import Piece from "./piece";

class Pawn extends Piece {
    public constructor(rowId: number, colId: number) {
        super(rowId, colId, 1);
    }

    public toStr(): string {
        return " p ";
    }
}

export default Pawn;
