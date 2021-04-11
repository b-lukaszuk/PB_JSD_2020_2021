import Piece from "./piece";

class Knight extends Piece {
    public constructor() {
        super(2);
    }

    public toStr(): string {
        return " N ";
    }
}

export default Knight;
