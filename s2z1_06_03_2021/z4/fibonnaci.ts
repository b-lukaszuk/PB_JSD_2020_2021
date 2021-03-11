class Fibonacci {
    private _FibDict: Object;

    public constructor() {
        this._FibDict = { 1: 1, 2: 1 }; // pierwsze 2 liczby ciagu Fibonacciego
    }

    getFibDict(): Object {
        return this._FibDict;
    }

    // uses recursion and dictionary search (to improve effectivenes)
    private getNthFib(n: number): number {
        if (this._FibDict.hasOwnProperty(n)) {
            return this._FibDict[n];
        } else {
            // podliczone liczby do slownika celem pozniejszego wykorzystania
            this._FibDict[n] = this.getNthFib(n - 2) + this.getNthFib(n - 1);
            return this._FibDict[n];
        }
    }

    public getFibSequence(n: number): Array<number> {
        let fibNums: Array<number> = [];
        for (let i = 0; i < n; i++) {
            // +1, bo klucze w slowniku od 1, oraz n jest inclusive
            fibNums.push(this.getNthFib(i + 1));
        }
        return fibNums;
    }
}

export default Fibonacci;
