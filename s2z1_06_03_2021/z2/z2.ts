///////////////////////////////////////////////////////////////////////////////
//                                   TASK 2 //
///////////////////////////////////////////////////////////////////////////////
// Write a guessing game where the user has to guess a secret
// number. After every guess the program tells the user whether their
// number was too large or too small. At the end the number of tries
// needed should be printed. It counts only as one try if they input
// the same number multiple times consecutively. Range 1 - 100.
///////////////////////////////////////////////////////////////////////////////

// za: https://nodejs.org/api/readline.html
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// start-stop (inclusive-exclusive)
function randNumFromRange(start: number, stop: number): number {
    return Math.floor(Math.random() * (stop - start) + start);
}

const numToGuess: number = randNumFromRange(1, 11);

console.log("Hello stranger. Let's play a game");
console.log("I'm thinking of a number between 1 and 100");
console.log("Can You guess the number?");
console.log("===========");

// quick and dirty, rekurencja, moze byc nieefektywne
// nie sprawdza poprawnosci inputu
function recRlQuestion() {
    rl.question("What is Your guess? ", (answer: string) => {
        let guess: number = parseInt(answer);
        if (guess === numToGuess) {
            console.log("That's it! Congratulations! You win!");
            return rl.close()
        } else if (guess < numToGuess) {
            console.log("Higher");
            recRlQuestion();
        } else {
            console.log("Lower");
            recRlQuestion();
        }
    })
}

rl.on("close", () => {
    console.log("Game over. Bye!");
    process.exit(0);
})

recRlQuestion();




