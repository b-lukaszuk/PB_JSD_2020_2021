class Host {
    // klasa sluzy tylko do wypisywania informacji
    public constructor() {
    }

    // oglasza rozpoczecie gry i o co w niej chodzi
    // minRange/maxRange (inclusive-exclusive)
    public declareGameBegin(minRange: number, maxRange: number): void {
        console.log("======================");
        console.log("HOST: Let's start a game");
        console.log("HOST: Hinter, You choose a random number between",
            minRange, "and", maxRange - 1);
        console.log("HOST: Guesser, You will take a guess");
        console.log("HOST: Hinter,",
            "You will provide a feedback regarding the guess correctness");
        console.log("HOST: Let us begin");
        console.log("======================");
    }

    public declareGameEnd(numOfGuesses: number,
        isGameOver: boolean): void {
        console.log("======================");
        console.log("HOST: The time allocated for the game has passed");
        console.log("HOST: After", numOfGuesses, "unique guess(es) the result",
            isGameOver ? "has been settled" : "has not been settled");
        console.log("HOST:", isGameOver ? "Guesser wins" : "Hinter wins");
        console.log("HOST: Game over. Thank You for fair play");
        console.log("======================");
    }
}
export default Host;
