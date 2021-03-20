import { capitalize } from "./utilities";

class PigDelatenizer {
    // nothing fancy to do here
    constructor() {
    }

    private mvLastLetToFront(word: string): string {
        // String.slice() -1, tzn. ost od konca (jak w pythonie)
        return word.slice(-1) + word.slice(0, -1);
    }

    private getDeLatWord(word: string): string {
        // -2, bo oprocz 2 ostatnich liter -> pigLatynizowane "ay"
        return this.mvLastLetToFront(word.slice(0, -2));
    }

    // zalozenie: zdanie zlozone z samych liter
    // brak obslugi imion, nazw wlasnych
    // dozwolone => patrz ./README.md
    public getDeLatSentence(sentence: string): string {
        let words: Array<string> = sentence.split(" ");
        let deLatWords: Array<string> = [];
        for (let i = 0; i < words.length; i++) {
            let word: string = this.getDeLatWord(words[i]);
            // kapitalizacja pierwszego slowa w zdaniu
            if (i === 0) {
                deLatWords.push(capitalize(word));
            } else {
                deLatWords.push(word);
            }
        }
        return deLatWords.join(" ");
    }

}

export default PigDelatenizer;
