class Fibonacci {
    private _FibDict: Object;

    public constructor() {
        this._FibDict = { 1: 1, 2: 1 }; // pierwsze 2 liczby ciagu Fibonacciego
    }

    // uses recursion and dictionary search (to improve effectivenes)
    private getNthFib(nthElt: number): number {
        if (this._FibDict.hasOwnProperty(nthElt)) {
            return this._FibDict[nthElt];
        } else {
            // podliczone liczby do slownika celem pozniejszego wykorzystania
            this._FibDict[nthElt] = this.getNthFib(nthElt - 2) +
                this.getNthFib(nthElt - 1);
            return this._FibDict[nthElt];
        }
    }

    public getFibSequence(nFirstFibNums: number): Array<number> {
        let fibNums: Array<number> = [];
        for (let i = 0; i < nFirstFibNums; i++) {
            // +1, bo klucze w slowniku od 1, oraz nFirstFibNums jest inclusive
            fibNums.push(this.getNthFib(i + 1));
        }
        return fibNums;
    }
}

export default Fibonacci;
