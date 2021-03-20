///////////////////////////////////////////////////////////////////////////////
//                                  importy                                  //
///////////////////////////////////////////////////////////////////////////////
import Guesser from "./guesser";
import Hinter from "./hinter";
import Host from "./host";
import Connection from "./connection";

///////////////////////////////////////////////////////////////////////////////
//                              zmienne globalne                             //
///////////////////////////////////////////////////////////////////////////////
// minimalna i maksymalna ranga guessow
const minRange: number = 1; // inclusive
const maxRange: number = 101; // exclusive
// 2^7 = 128, czyli 7 guessow powinno wystarczyc, jest z zapasem
// jest break aby nie chodzic na pusto
const maxNumOfGuesses: number = 10;
// uczestnicy
const hinter: Hinter = new Hinter(minRange, maxRange);
const guesser: Guesser = new Guesser(minRange, maxRange);
const host: Host = new Host();
// do wymiany informacji (curGuess, prevGuess, lastHint, isGameOver)
// miedzy guesserem a hinterem
const con: Connection = new Connection(
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
    let noOfGuesses: number = 0; // ile razy juz zgadywano
    for (let i = 0; i < maxNumOfGuesses; i++) {
        con.setCurGuess(guesser.getGuess());
        con.setLastHint(
            hinter.evaluateGuess(con.getCurGuess())
        );
        con.setIsGameOver(
            guesser.isItOver(con.getLastHint())
        );
        if (con.getCurGuess() !== con.getPrevGuess()) {
            noOfGuesses++;
            con.setPrevGuess(con.getCurGuess());
        }
        if (con.getIsGameOver()) {
            break;
        }
    }
    host.declareGameEnd(noOfGuesses, con.getIsGameOver());
}

///////////////////////////////////////////////////////////////////////////////
//                             wykonanie programu                            //
///////////////////////////////////////////////////////////////////////////////
main();
