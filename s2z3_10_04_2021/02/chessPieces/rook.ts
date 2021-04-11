import Piece from "./piece";

class Rook extends Piece {
    public constructor() {
        super(5);
    }

    public toStr(): string {
        return " R ";
    }
}

export default Rook;
