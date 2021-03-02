///////////////////////////////////////////////////////////////////////////////
//                                   Task 1                                  //
///////////////////////////////////////////////////////////////////////////////
// Write a program that prints all prime numbers in given range. Take
// sub from 1-100.
///////////////////////////////////////////////////////////////////////////////

// helper function, useful for testing purposes
// similar to python's range
// https://www.w3schools.com/python/ref_func_range.asp
// start-stop (inclusive-exclusive)
function range(start: number, stop: number, step: number = 1): Array<number> {
    let tmp: Array<number> = [];
    for (let i = start; i < stop; i += step) {
        tmp.push(i);
    }
    return tmp;
}

// za https://en.wikipedia.org/wiki/Prime_number#Formulas_for_primes
// quick and dirty (division by i from 2 to sqrt(testedNum))
// (with small improvements) for isPrime
function isPrime(testedNum: number): Boolean {
    if (testedNum < 1) {
        throw "Number must be an integer greater than 0";
    } else if (testedNum === 1) {
        return false;
    } else if (testedNum === 2) {
        return true;
    } else if (testedNum % 2 === 0) {
        return false;
    } else {
        // +1, bo np. sqrt(25) to 5 i wtedy w for-ze sprawdzi tylko do 4
        for (let i = 2; i < Math.ceil(Math.sqrt(testedNum)) + 1; i++) {
            if (testedNum % i === 0) {
                return false;
            }
        }
        return true;
    }
}

// console.log(range(1, 21));
// console.log(range(1, 21).map(isPrime));

// start-stop (inclusive-exclusive)
function getPrimesInRange(start: number, stop: number): Array<number> {
    let numbers: Array<number> = range(start, stop);
    return numbers.filter(isPrime);
}

console.log(getPrimesInRange(1, 101));
