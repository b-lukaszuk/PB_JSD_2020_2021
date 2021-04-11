class Piece {
    // 0 - none (empty field)
    // 1 - pawn
    // 2 - knight
    // 3 - bishop
    // 5 - rook
    // 6 - queen
    // 7 - king
    // 8 - taken (possible for other piece to move to)
    private _value: number;
    private _rowId: number;
    private _colId: number;
    protected directions: Array<number> = [12, 2, 3, 5, 6, 7, 9, 10];

    public constructor(rowId: number, colId: number, value: number) {
        this._value = value;
        this._rowId = rowId;
        this._colId = colId;
    }

    public getValue() {
        return this._value;
    }

    public toStr(): string {
        return "   ";
    }

    private getNto12(howMany: number): Array<number> {
        let result: Array<number> = [this._rowId + howMany,
        this._colId];
        let isOk: boolean = result.every((a) => { return a >= 0 && a < 8 });
        return isOk ? result : undefined;
    }

    private getNto6(howMany: number): Array<number> {
        let result: Array<number> = [this._rowId - howMany,
        this._colId];
        let isOk: boolean = result.every((a) => { return a >= 0 && a < 8 });
        return isOk ? result : undefined;
    }

    private getNto3(howMany: number): Array<number> {
        let result: Array<number> = [this._rowId,
        this._colId + howMany];
        let isOk: boolean = result.every((a) => { return a >= 0 && a < 8 });
        return isOk ? result : undefined;
    }

    private getNto9(howMany: number): Array<number> {
        let result: Array<number> = [this._rowId,
        this._colId - howMany];
        let isOk: boolean = result.every((a) => { return a >= 0 && a < 8 });
        return isOk ? result : undefined;
    }

    private getNto2(howMany: number): Array<number> {
        let result: Array<number> = [this._rowId + howMany,
        this._colId + howMany];
        let isOk: boolean = result.every((a) => { return a >= 0 && a < 8 });
        return isOk ? result : undefined;
    }

    private getNto10(howMany: number): Array<number> {
        let result: Array<number> = [this._rowId + howMany,
        this._colId - howMany];
        let isOk: boolean = result.every((a) => { return a >= 0 && a < 8 });
        return isOk ? result : undefined;
    }

    private getNto5(howMany: number): Array<number> {
        let result: Array<number> = [this._rowId - howMany,
        this._colId + howMany];
        let isOk: boolean = result.every((a) => { return a >= 0 && a < 8 });
        return isOk ? result : undefined;
    }

    private getNto7(howMany: number): Array<number> {
        let result: Array<number> = [this._rowId - howMany,
        this._colId - howMany];
        let isOk: boolean = result.every((a) => { return a >= 0 && a < 8 });
        return isOk ? result : undefined;
    }

    protected getMvNto(direction: number, distance: number): Array<number> {
        switch (direction) {
            case 12:
                return this.getNto12(distance);
            case 2:
                return this.getNto2(distance);
            case 3:
                return this.getNto3(distance);
            case 5:
                return this.getNto5(distance);
            case 6:
                return this.getNto6(distance);
            case 7:
                return this.getNto7(distance);
            case 9:
                return this.getNto9(distance);
            default:
                return this.getNto10(distance);
        }
    }
}

export default Piece;
