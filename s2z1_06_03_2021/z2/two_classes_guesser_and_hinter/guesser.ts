import { getMiddleOfRange } from "./utilities";

class Guesser {
    private _minRangeForGuess: number;
    private _maxRangeForGuess: number;
    private _curGuess: number;
    // poczatkowy zakres z ktorego bedzie wybierany guess (inclusive-inclusive)
    // choc i tak zawsze bierze po srodku
    public constructor(minRange: number = 1, maxRange: number = 101) {
        this._minRangeForGuess = minRange;
        this._maxRangeForGuess = maxRange;
        this._curGuess = getMiddleOfRange(this._minRangeForGuess,
            this._maxRangeForGuess);
    }

    // zwraca Guess-a (zawsze Int)
    // deklaruje co zgaduje (console.log())
    public getGuess(): number {
        this._curGuess = getMiddleOfRange(this._minRangeForGuess,
            this._maxRangeForGuess);
        console.log("- Guesser: My guess is", this._curGuess);
        return this._curGuess;
    }

    /**
     * przyjmuje feedback odnosnie poprzedniego guessu
     * updateuje zakres zgadywania (_minRangeForGuess, _maxRangeForGuess)
     * jesli wygra to wypisuje monit
     * @param {number} feedback -1|0|1 (dla guess <|=|> secretNum)
     * @return {number} 1 - jesli wygrana, 0 - jesli szukamy dalej
     */
    public isItOver(feedback: number): boolean {
        let result: boolean = false;
        if (feedback < 0) {
            // +1 bo upperLimit w getMiddleOfRange() jest exclusive
            // a do tego pozniej pojdzie this._minRangeForGuess;
            this._minRangeForGuess = this._curGuess + 1;
        } else if (feedback > 0) {
            // +1 bo upperLimit w getMiddleOfRange() jest exclusive
            // a do tego pozniej pojdzie this._maxRangeForGuess;
            this._maxRangeForGuess = this._curGuess + 1;
        } else {
            result = true;
            console.log("- Guesser: Yay, So it was", this._curGuess)
            console.log("- Guesser: I win!");
        }
        return result;
    }
}

export default Guesser;
