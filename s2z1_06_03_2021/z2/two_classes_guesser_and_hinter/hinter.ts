class Hinter {
    private _secretNum: number;

    // rengeStart-rangeEnd (incl-excl)
    public constructor(rangeStart: number = 1, rangeEnd: number = 101) {
        this._secretNum = this.getRandNumFromRange(rangeStart, rangeEnd);
    }

    /**
     * met. pomocn - imitacja pythonowego range()
     * zwraca losowa liczbe (Int) z podanego zakresu
     * @param {number} start - liczba (Int), poczatek zakresu (inclusive)
     * @param {number} start - liczba (Int), koniec zakresu (exclusive)
     * @return {number} losowa liczba (Int) z wybranego zakresu
     */
    private getRandNumFromRange(start: number, stop: number): number {
        return Math.floor(Math.random() * (stop - start) + start);
    }

    /**
     * ocenia czy guess jest mniejszy (-1), rowny(0), czy wiekszy (1)
     * niz sekretna liczba
     * @param {number} guess - liczba (Int) z zakr z ktorego utworz _secretNum
     * @return {number} -1|0|1 (dla guess <|=|> SecretNum)
     */
    public evaluateGuess(guess: number): number {
        if (guess < this._secretNum) {
            return -1;
        } else if (guess > this._secretNum) {
            return 1;
        } else {
            return 0;
        }
    }
}


export default Hinter;
