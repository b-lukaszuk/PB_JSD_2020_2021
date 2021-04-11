import Piece from "./piece";

class Pawn extends Piece {
    public constructor() {
        super(1);
    }

    public toStr(): string {
        return " p ";
    }
}

export default Pawn;
