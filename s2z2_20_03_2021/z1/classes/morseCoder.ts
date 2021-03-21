// simple morse code chart (to copy-paste)
// http://www.csgnetwork.com/morsecodechrtbl.html
// note: it does not include all engl letters (e.g. those that come from french)

// https://en.wikipedia.org/wiki/File:International_Morse_Code.svg
// 1) the lenght of a dot is one unit
// 2) a dash is three units
// 3) The space between the parts of the same letter is one unit
// 4) The space between letters is three units
// 5) The space between words is seven units

class MorseCoder {
    // in my code:
    // space between letters is 1 space character
    // space between words is 1 tab character
    private spaceBetwMorseLetters = " ";
    private spaceBetwMorseWords = "\t";
    private morseCodeDict: Object = {
        A: ".-",
        C: "-.-.",
        E: ".",
        G: "--.",
        I: "..",
        K: "-.-",
        M: "--",
        O: "---",
        Q: "--.-",
        S: "...",
        U: "..-",
        W: ".--",
        Y: "-.--",
        "0": "-----",
        "2": "..---",
        "4": "....-",
        "6": "-....",
        "8": "---..",
        ".": ".-.-.-",
        ",": "--..--",
        B: "-...",
        D: "-..",
        F: "..-.",
        H: "....",
        J: ".---",
        L: ".-..",
        N: "-.",
        P: ".--.",
        R: ".-.",
        T: "-",
        V: "...-",
        X: "-..-",
        Z: "--..",
        "1": ".----",
        "3": "...--",
        "5": ".....",
        "7": "--...",
        "9": "----.",
    };

    public constructor() {
        // nothing to do here
    }

    private codeLetter(englishLetter: string): string {
        return this.morseCodeDict[englishLetter.toUpperCase()];
    }

    private codeWord(englishWord: string): string {
        let englishLetters: Array<string> = englishWord.split("");
        let morseLetters: Array<string> = englishLetters.map((letter: string) => {
            return this.codeLetter(letter);
        });
        let morseWord: string = morseLetters.join(this.spaceBetwMorseLetters);
        return morseWord;
    }

    public codeMessage(message: string): string {
        let englishWords: Array<string> = message.split(" ");
        let morseWords: Array<string> = englishWords.map((word: string) => {
            return this.codeWord(word);
        });
        let morseMessage: string = morseWords.join(this.spaceBetwMorseWords);
        return morseMessage;
    }
}

export default MorseCoder;
