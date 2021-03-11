class PigLatenizer {
    // nothing fancy to do here
    public constructor() {
    }

    // przesuwa 1 litere na koniec slowa (wytnij i wklej)
    // zalozenie: slowo sklada sie z samych liter
    private mvFirstLetToEnd(word: string): string {
        // String.slice() jesli tylko start index, to end index = String.length
        return word.slice(1) + word[0];
    }

    // substitute of python's capitalize
    // https://www.w3schools.com/python/ref_string_capitalize.asp
    private capitalize(word: string): string {
        // String.slice() jesli tylko start index, to end index = String.length
        return word[0].toUpperCase() + word.slice(1).toLocaleLowerCase();
    }

    // zalozenie: zdanie zlozone z samych liter
    // brak obslugi imion, nazw wlasnych, przecinkow, kropek, itd.
    // dozwolone => patrz ./README.md
    public getLatSentence(sentence: string): string {
        let words: Array<string> = sentence.split(" ");
        let latWords: Array<string> = [];
        for (let i = 0; i < words.length; i++) {
            let word: string = this.mvFirstLetToEnd(words[i]) + "ay";
            if (i === 0) {
                latWords.push(this.capitalize(word));
            } else {
                latWords.push(word);
            }
        }
        return latWords.join(" ");
    }

    private mvLastLetToFront(word: string): string {
        // String.slice() -1, tzn. ost od konca (jak w pythonie)
        return word.slice(-1) + word.slice(0, -1);
    }

    private getDeLatWord(word: string): string {
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
            if (i === 0) {
                deLatWords.push(this.capitalize(word));
            } else {
                deLatWords.push(word);
            }
        }
        return deLatWords.join(" ");
    }
}

export default PigLatenizer;
