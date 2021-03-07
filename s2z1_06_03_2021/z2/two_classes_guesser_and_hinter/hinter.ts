import { getRandNumFromRange } from "./utilities";

class Hinter {
    private _secretNum: number;

    // rengeStart-rangeEnd (incl-excl)
    public constructor(rangeStart: number = 1, rangeEnd: number = 101) {
        this._secretNum = getRandNumFromRange(rangeStart, rangeEnd);
    }

    /**
     * ocenia czy guess jest mniejszy (-1), rowny(0), czy wiekszy (1)
     * niz sekretna liczba
     * wypisuje monit: higher|lower|that's right
     * @param {number} guess - liczba (Int) z zakr z ktorego utworz _secretNum
     * @return {number} -1|0|1 (dla guess <|=|> SecretNum)
     */
    public evaluateGuess(guess: number): number {
        if (guess < this._secretNum) {
            console.log("+ Hinter: higher");
            return -1;
        } else if (guess > this._secretNum) {
            console.log("+ Hinter: lower");
            return 1;
        } else {
            console.log("+ Hinter: You got it!");
            console.log("+ Hinter: Congratulations!");
            return 0;
        }
    }
}

export default Hinter;
