import randInt from "../utils/randInt";
import Dictionary from "./dictionary";

class Player {
    private _id: number;
    private _color: string;
    private _uptoRow: number; 	// exclusive
    private _uptoCol: number; 	// exclusive
    private _points: number = 0; 	// each correct match is 100 points
    private _revealedElts: Dictionary[] = [];
    private _correctGuesses: Dictionary[] = [];

    /**
     * @param {number[]} guessesRange range for guesses [rowExcl, colExcl]
     */
    public constructor(id: number, color: string,
        guessesRange: number[]) {
        this._id = id;
        this._color = color;
        [this._uptoRow, this._uptoCol] = guessesRange;
    }

    public getId(): number {
        return this._id;
    }

    public getPoints(): number {
        return this._points;
    }

    public getColor(): string {
        return this._color;
    }



    /**
     * returns player name
     */
    public getName(): string {
        return "Player " + this._id.toString();
    }

    /**
     * returns a random guess (position of the card from range)
     */
    public getRandomGuess(): number[] {
        let randRow = randInt(this._uptoRow);
        let randCol = randInt(this._uptoCol);
        return [randRow, randCol];
    }

    /**
     * returns undefined if symbol is not yer in the _revealedElts
     */
    // private getGuessesForSymbol(symbol: string): number[][] {
    //     return this._revealedElts.find((elt) => {
    //         return elt.getSymbol() === symbol;
    //     });
    // }

    public moveSymbolToCorrectGuesses(symbol: string): void {
        let foundIndex: number = this._revealedElts.findIndex((elt) => {
            return elt.getSymbol() === symbol
        })
        if (foundIndex <= 0) {
            // Array.splice() returns an array and modifies the original array
            this._correctGuesses.push(this._revealedElts.splice(foundIndex)[0]);
        }
    }

    public updateRevealedElts(symbol: string, position: number[]) {
        // if the symbol exist on the list add second position
        if (this._revealedElts.some((elt) => {
            return elt.getSymbol() === "symbol"
        })) {
            this._revealedElts.push()
        } else {
            this._revealedElts.push(new Dictionary(symbol, [position]));
        }

    }



}

export default Player;
