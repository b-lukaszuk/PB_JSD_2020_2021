class Piece {
    // 0 - none (empty field)
    // 1 - pawn
    // 2 - knight
    // 3 - bishop
    // 5 - rook
    // 6 - queen
    // 7 - king
    private _value: number;

    public constructor(value: number) {
        this._value = value;
    }

    public getValue() {
        return this._value;
    }

    public toStr(): string {
        return "   ";
    }
}

export default Piece;
