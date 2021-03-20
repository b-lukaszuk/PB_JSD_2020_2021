import { capitalize } from "./utilities";

class PigLatenizer {
    // nothing fancy to do here
    public constructor() { }

    // przesuwa 1 litere na koniec slowa (wytnij i wklej)
    // zalozenie: slowo sklada sie z samych liter
    private mvFirstLetToEnd(word: string): string {
        // String.slice() jesli tylko start index, to end index = String.length
        return word.slice(1) + word[0];
    }

    // zalozenie: zdanie zlozone z samych liter
    // brak obslugi imion, nazw wlasnych, przecinkow, kropek, itd.
    // dozwolone => patrz ./README.md
    public getLatSentence(sentence: string): string {
        let words: Array<string> = sentence.split(" ");
        let latWords: Array<string> = [];
        for (let i = 0; i < words.length; i++) {
            let word: string = this.mvFirstLetToEnd(words[i]) + "ay";
            // kapitalizacja pierwszej litery pierwszgo slowa w zdaniu
            if (i === 0) {
                latWords.push(capitalize(word));
            } else {
                latWords.push(word);
            }
        }
        return latWords.join(" ");
    }
}

export default PigLatenizer;
