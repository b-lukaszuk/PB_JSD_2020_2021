///////////////////////////////////////////////////////////////////////////////
//                                   Task 4                                  //
///////////////////////////////////////////////////////////////////////////////
// Write a class that prints the list of the first n Fibonacci
// numbers. The first two Fibonacci numbers are 1 and 1. The n+1-st
// Fibonacci number can be computed by adding the n-th and the n-1-th
// Fibonacci number. The first few are therefore 1, 1, 1+1=2, 1+2=3,
// 2+3=5, 3+5=8.
///////////////////////////////////////////////////////////////////////////////
class Fibonacci {
    private FibDict: Object;

    public constructor() {
        this.FibDict = { 1: 1, 2: 1 };
    }

    // uses recursion and dictionary search (to improve effectivenes)
    private getNthFib(n: number): number {
        if (this.FibDict.hasOwnProperty(n)) {
            return this.FibDict[n];
        } else {
            // wbijanie policzonych wejsc do slownika celem pozniejszego wykorzystania
            this.FibDict[n] = this.getNthFib(n - 2) + this.getNthFib(n - 1);
            return this.FibDict[n];
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

let fn: Fibonacci = new Fibonacci();

console.log("Fib seq of 5 elts:", fn.getFibSequence(5));
console.log("Fib seq of 11 elts:", fn.getFibSequence(11));
console.log("Fib seq of 20 elts:", fn.getFibSequence(20));
console.log("Fib seq of 50 elts:", fn.getFibSequence(50));
