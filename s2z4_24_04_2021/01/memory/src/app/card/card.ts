class Card {
    private _symbol: string;
    private _covered: boolean;
    private _matched: boolean;

    public constructor(symbol: string) {
        this._symbol = symbol;
        this._covered = true; // covered/uncovered right now
        this._matched = false; // is matched with other card of a pair
    }

    public toString(): string {
        return this._covered || this._matched ? '' : this._symbol;
    }

    public toggleCovered(): void {
        this._covered = !this._covered;
    }

    public toggleMatched(): void {
        this._matched = !this._matched;
    }

    public isMatched(): boolean {
        return this._matched;
    }

    public getStatus(): string {
        if (this._matched) {
            return 'matched';
        } else if (this._covered) {
            return 'covered';
        } else {
            return 'uncovered';
        }
    }
}

export default Card;
