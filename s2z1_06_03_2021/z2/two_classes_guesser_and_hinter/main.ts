///////////////////////////////////////////////////////////////////////////////
//                                  importy                                  //
///////////////////////////////////////////////////////////////////////////////
import Guesser from "./guesser";
import Hinter from "./hinter";


///////////////////////////////////////////////////////////////////////////////
//                              uwagi dodatkowe                              //
///////////////////////////////////////////////////////////////////////////////
// "It counts only as one try if they input the same number multiple
// times consecutively." - algorytm guesera nie powtorzy zgadywania tego samego
// numeru => nie dodaje obslugi tego wymogu (jest on w ../human_user_guesser/)


///////////////////////////////////////////////////////////////////////////////
//                              zmienne globalne                             //
///////////////////////////////////////////////////////////////////////////////
let hinter: Hinter = new Hinter();
let guesser: Guesser = new Guesser();
// do wymiany guessow miedzy guesserem a hinterem
// Int (1-100, incl-incl)
let lastGuess: number = 0; // modyfikowana w main()
// do wymiany hintow miedzy hinterem a guesserem
// Int -1|0|1 (dla guess <|=|> SecretNum)
let lastHint: number; // modyfikowana w main()
// do decyzji czy zakonczyc gre
let isGameOver: Boolean = false; // modyfikowana w main()


///////////////////////////////////////////////////////////////////////////////
//                                  funkcje                                  //
///////////////////////////////////////////////////////////////////////////////
// glowna funkcja progamu
function main(): void {
    let noOfGuesses: number = 1;
    console.log("HOST: Let's start a game");
    console.log("HOST: Hinter, You choose a random number between 1 and 100");
    console.log("HOST: Guesser, You will take a guess");
    console.log("HOST: Hinter,",
        "You will provide a feedback regarding the guess correctness");
    console.log("HOST: Let us begin");
    console.log("======================");
    // 2^7 = 128, czyli 7 guessow powinno wystarczyc, jest z zapasem
    for (; noOfGuesses < 10; noOfGuesses++) {
        lastGuess = guesser.getGuess();
        lastHint = hinter.evaluateGuess(lastGuess);
        isGameOver = guesser.isItOver(lastHint);
        if (isGameOver) {
            break;
        }
    }
    console.log("======================");
    console.log("HOST: The time allocated for the game has passed");
    console.log("HOST: After", noOfGuesses, "guesses the result",
        isGameOver ? "has been settled" : "has not been settled");
    console.log("HOST:", isGameOver ? "Guesser wins" : "Hinter wins");
    console.log("HOST: Anyway. Game over. Thank You for fair play");
}


///////////////////////////////////////////////////////////////////////////////
//                             wykonanie programu                            //
///////////////////////////////////////////////////////////////////////////////
main();
