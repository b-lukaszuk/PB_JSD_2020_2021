class Guesser {
    private _minRangeForGuess: number;
    private _maxRangeForGuess: number;
    private _curGuess: number;
    // poczatkowy zakres z ktorego bedzie wybierany guess (inclusive-inclusive)
    // choc i tak zawsze bierze po srodku
    public constructor(minRange: number = 1, maxRange: number = 100) {
        this._minRangeForGuess = minRange;
        this._maxRangeForGuess = maxRange;
        this._curGuess = this.getGuess();
    }

    // zwraca srednia (zwasze Int) z 2 liczb
    getAverage(n1: number, n2: number): number {
        return Math.round((n1 + n2) / 2);
    }

    // zwraca Guess-a (zawsze Int)
    public getGuess(): number {
        return this.getAverage(this._minRangeForGuess, this._maxRangeForGuess);
    }

    /**
     * przyjmuje feedback odnosnie poprzedniego guessu
     * updateuje zakres zgadywania (_minRangeForGuess, _maxRangeForGuess)
     * @param {number} feedback -1|0|1 (dla guess <|=|> secretNum)
     * @return {number} 1 - jesli wygrana, 0 - jesli szukamy dalej
     */
    public isItOver(feedback: number): Boolean {
        let result: Boolean = false;
        if (feedback < 0) {
            this._maxRangeForGuess = this._curGuess;
        } else if (feedback > 0) {
            this._minRangeForGuess = this._curGuess;
        } else {
            result = true;
        }
        return result;
    }
}

export default Guesser;
