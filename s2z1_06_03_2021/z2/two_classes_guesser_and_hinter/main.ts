///////////////////////////////////////////////////////////////////////////////
//                                  importy                                  //
///////////////////////////////////////////////////////////////////////////////
import Guesser from "./guesser";
import Hinter from "./hinter";
import Host from "./host";
import Connection from "./connection";
import { Decision } from "./customTypes";

///////////////////////////////////////////////////////////////////////////////
//                              zmienne globalne                             //
///////////////////////////////////////////////////////////////////////////////
// minimalna i maksymalna ranga guessow
const minRange: number = 1; // inclusive
const maxRange: number = 101; // exclusive
const maxNumOfGuesses: number = 10;
// uczestnicy
const hinter: Hinter = new Hinter(minRange, maxRange);
const guesser: Guesser = new Guesser(minRange, maxRange);
const host: Host = new Host();
// do wymiany informacji (curGuess, prevGuess, lastHint, isGameOver)
// miedzy guesserem a hinterem
const connection: Connection = new Connection(
    minRange - 1,
    minRange - 1,
    -1,
    false
);

///////////////////////////////////////////////////////////////////////////////
//                                  funkcje                                  //
///////////////////////////////////////////////////////////////////////////////
function main(): void {
    host.declareGameBegin(minRange, maxRange);
    let noOfGuesses: number = 0;
    // 2^7 = 128, czyli 7 guessow powinno wystarczyc, jest z zapasem
    // jest break aby nie chodzic na pusto
    for (let i = 0; i < maxNumOfGuesses; i++) {
        connection.setCurGuess(guesser.getGuess());
        connection.setLastHint(
            hinter.evaluateGuess(connection.getCurGuess())
        );
        connection.setIsGameOver(
            guesser.isItOver(connection.getLastHint())
        );
        if (connection.getCurGuess() !== connection.getPrevGuess()) {
            noOfGuesses++;
            connection.setPrevGuess(connection.getCurGuess());
        }
        if (connection.getIsGameOver()) {
            break;
        }
    }
    host.declareGameEnd(noOfGuesses, connection.getIsGameOver());
}

///////////////////////////////////////////////////////////////////////////////
//                             wykonanie programu                            //
///////////////////////////////////////////////////////////////////////////////
main();
