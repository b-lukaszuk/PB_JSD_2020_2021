import Piece from "./piece";

class None extends Piece {
    public constructor(rowId: number, colId: number) {
        super(rowId, colId, 0);
    }
}

export default None;
