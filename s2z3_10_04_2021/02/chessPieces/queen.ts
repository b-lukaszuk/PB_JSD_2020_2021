import Piece from "./piece";

class Queen extends Piece {
    public constructor() {
        super(6);
    }

    public toStr(): string {
        return " Q ";
    }
}

export default Queen;
