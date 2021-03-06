///////////////////////////////////////////////////////////////////////////////
//                                   Task 2                                  //
///////////////////////////////////////////////////////////////////////////////
// Write a guessing game where the user has to curGuess a secret
// number. After every curGuess the program tells the user whether their
// number was too large or too small. At the end the number of tries
// needed should be printed. It counts only as one try if they input
// the same number multiple times consecutively. Range 1 - 100.
///////////////////////////////////////////////////////////////////////////////

// za: https://nodejs.org/api/readline.html
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// start-stop (inclusive-exclusive)
function randNumFromRange(start: number, stop: number): number {
    return Math.floor(Math.random() * (stop - start) + start);
}

const numToGuess: number = randNumFromRange(1, 101);
let numOfTries: number = 0;
// improvement over required check for previously typed number
// ("... if they input the same number multiple times consecutively")
let checkedNums: Array<number> = [];

console.log("Hello stranger. Let's play a game");
console.log("I'm thinking of a number between 1 and 100");
console.log("Can You guess the number?");
console.log("===========");

// quick and dirty, REKURENCJA, moze byc nieefektywne
// nie sprawdza poprawnosci inputu
function recRlQuestion() {
    rl.question("What is Your Guess? ", (answer: string) => {
        let curGuess: number = parseInt(answer);
        if (checkedNums.includes(curGuess)) {
            console.log("You already checked that number! Try again.");
            console.log("By the way.",
                curGuess < numToGuess ? "Higher" : "Lower");
            recRlQuestion();
        } else {
            checkedNums.push(curGuess);
            numOfTries++;
            if (curGuess === numToGuess) {
                console.log("That's it! Congratulations! You win!");
                console.log("Number of tries:", numOfTries);
                return rl.close();
            } else if (curGuess < numToGuess) {
                console.log("Higher");
                recRlQuestion();
            } else {
                console.log("Lower");
                recRlQuestion();
            }
        }
    });
}

rl.on("close", () => {
    console.log("Game over. Bye!");
    process.exit(0);
});

recRlQuestion();
