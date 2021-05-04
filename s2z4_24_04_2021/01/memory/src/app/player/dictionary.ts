class Dictionary {

    private _symbol: string;
    private _positions: number[][];

    public constructor(symbol: string, positions: number[][]) {
        this._symbol = symbol;
        this._positions = positions;
    }

    public getSymbol(): string {
        return this._symbol;
    }

    public getPositions(): number[][] {
        return this._positions;
    }
}

export default Dictionary;
