///////////////////////////////////////////////////////////////////////////////
//                                  importy                                  //
///////////////////////////////////////////////////////////////////////////////
import Guesser from "./guesser";
import Hinter from "./hinter";
import Host from "./host";
import { Decision } from "./customTypes";


///////////////////////////////////////////////////////////////////////////////
//                              zmienne globalne                             //
///////////////////////////////////////////////////////////////////////////////
// minimalna i maksymalna ranga guessow
const minRange: number = 1; // inclusive
const maxRange: number = 101; // exclusive
// uczestnicy
const hinter: Hinter = new Hinter(minRange, maxRange);
const guesser: Guesser = new Guesser(minRange, maxRange);
const host: Host = new Host();
// do wymiany guessow miedzy guesserem a hinterem
let curGuess: number; // modyfikowana w main()
// do: "It counts only as one try if they input the same number
// multiple times consecutively."
// jesli ten sam guess pod rzad, ale jesli byla przerwa liczymy jako nowy
let prevGuess: number = 0; // modyfikowana w main();
// do wymiany hintow miedzy hinterem a guesserem
// Int -1|0|1 (dla guess <|=|> SecretNum)
let lastHint: Decision; // modyfikowana w main()
// do decyzji czy zakonczyc gre
let isGameOver: boolean = false; // modyfikowana w main()


///////////////////////////////////////////////////////////////////////////////
//                                  funkcje                                  //
///////////////////////////////////////////////////////////////////////////////
// glowna funkcja progamu
function main(): void {
    host.declareGameBegin(minRange, maxRange);
    let noOfGuesses: number = 0;
    // 2^7 = 128, czyli 7 guessow powinno wystarczyc, jest z zapasem
    // jest break aby nie chodzic na pusto
    for (let i = 0; i < 100; i++) {
        curGuess = guesser.getGuess();
        lastHint = hinter.evaluateGuess(curGuess);
        isGameOver = guesser.isItOver(lastHint);
        if (curGuess !== prevGuess) {
            noOfGuesses++;
            prevGuess = curGuess;
        }
        if (isGameOver) {
            break;
        }
    }
    host.declareGameEnd(noOfGuesses, isGameOver);
}


///////////////////////////////////////////////////////////////////////////////
//                             wykonanie programu                            //
///////////////////////////////////////////////////////////////////////////////
main();
