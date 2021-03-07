///////////////////////////////////////////////////////////////////////////////
//                                  importy                                  //
///////////////////////////////////////////////////////////////////////////////
import Guesser from "./guesser";
import Hinter from "./hinter";
import Host from "./host";


///////////////////////////////////////////////////////////////////////////////
//                              uwagi dodatkowe                              //
///////////////////////////////////////////////////////////////////////////////
// "It counts only as one try if they input the same number multiple
// times consecutively." - algorytm guesera nie powtorzy zgadywania tego samego
// numeru => nie dodaje obslugi tego wymogu (jest on w ../human_user_guesser/)


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
// Int (1-100, incl-incl)
let lastGuess: number = 0; // modyfikowana w main()
// do wymiany hintow miedzy hinterem a guesserem
// Int -1|0|1 (dla guess <|=|> SecretNum)
let lastHint: number; // modyfikowana w main()
// do decyzji czy zakonczyc gre
let isGameOver: boolean = false; // modyfikowana w main()


///////////////////////////////////////////////////////////////////////////////
//                                  funkcje                                  //
///////////////////////////////////////////////////////////////////////////////
// glowna funkcja progamu
function main(): void {
    host.declareGameBegin(minRange, maxRange);
    let noOfGuesses: number = 1;
    // 2^7 = 128, czyli 7 guessow powinno wystarczyc, jest z zapasem
    // jest break aby nie chodzic na pusto
    while (noOfGuesses < 100) {
        lastGuess = guesser.getGuess();
        lastHint = hinter.evaluateGuess(lastGuess);
        isGameOver = guesser.isItOver(lastHint);
        if (isGameOver) {
            break;
        }
        noOfGuesses++;
    }
    host.declareGameEnd(noOfGuesses, isGameOver);
}


///////////////////////////////////////////////////////////////////////////////
//                             wykonanie programu                            //
///////////////////////////////////////////////////////////////////////////////
main();
