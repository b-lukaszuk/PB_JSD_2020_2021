import { getMiddleOfRange } from "../utilities/rangeFuncs";
import { Decision } from "../customTypes/decision";

class Guesser {
    private _minRangeForGuess: number; // inclusive
    private _maxRangeForGuess: number; // exclusive
    private _curGuess: number;
    // poczatkowy zakres z ktorego bedzie wybierany guess (inclusive-exclusive)
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
        // range: inclusive, INCLUSIVE
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
    public isItOver(feedback: Decision): boolean {
        let result: boolean = false;
        if (feedback < 0) {
            this._minRangeForGuess = this._curGuess;
        } else if (feedback > 0) {
            this._maxRangeForGuess = this._curGuess;
        } else {
            result = true;
            console.log("- Guesser: Yay, So it was", this._curGuess)
            console.log("- Guesser: I win!");
        }
        return result;
    }
}

export default Guesser;
