import Piece from "./piece";

class King extends Piece {
    public constructor() {
        super(7);
    }

    public toStr(): string {
        return " K ";
    }
}

export default King;
