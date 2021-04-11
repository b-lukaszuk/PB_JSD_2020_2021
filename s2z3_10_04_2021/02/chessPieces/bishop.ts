import Piece from "./piece";

class Bishop extends Piece {
    public constructor() {
        super(3);
    }

    public toStr(): string {
        return " B ";
    }
}

export default Bishop;
