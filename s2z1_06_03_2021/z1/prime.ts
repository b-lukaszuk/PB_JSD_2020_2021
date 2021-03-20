import { range } from "./utilities";

class Prime {
    // nie bedziemy nic robic w konstruktorze
    public constructor() {
    }

    // za https://en.wikipedia.org/wiki/Prime_number#Formulas_for_primes
    // quick and dirty (division by i from 2 to sqrt(testedNum))
    // (with small improvements) for isPrime
    private isPrime(testedNum: number): boolean {
        if (testedNum < 1) {
            throw "The number must be an integer greater than 0";
        } else if (testedNum === 1) {
            return false;
        } else if (testedNum <= 3) {
            return true;
        } else if (testedNum % 2 === 0) {
            return false;
        } else {
            // Math.ceil() +1, bo np. sqrt(25)=5, wtedy for sprawdzi tylko do 4
            // i += 2; bo powyzej 2 tylko inty nieparzyste sa primeami
            for (let i = 3; i < Math.ceil(Math.sqrt(testedNum)) + 1; i += 2) {
                if (testedNum % i === 0) {
                    return false;
                }
            }
            return true;
        }
    }

    // start-stop (inclusive-exclusive)
    public getPrimesInRange(start: number, stop: number): Array<number> {
        let numbers: Array<number> = range(start, stop);
        return numbers.filter(this.isPrime);
    }
}

export default Prime;
