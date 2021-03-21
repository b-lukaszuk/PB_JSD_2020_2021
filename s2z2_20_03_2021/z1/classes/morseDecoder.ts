// simple morse code chart (to copy-paste)
// http://www.csgnetwork.com/morsecodechrtbl.html
// note: it does not include all engl letters (e.g. those that come from french)

// https://en.wikipedia.org/wiki/File:International_Morse_Code.svg
// 1) the lenght of a dot is one unit
// 2) a dash is three units
// 3) The space between the parts of the same letter is one unit
// 4) The space between letters is three units
// 5) The space between words is seven units

class MorseDecoder {
    // in my morse coding code (see MorseCoder class):
    // space between letters is 1 space character
    // space between words is 1 tab character
    private spaceBetwMorseLetters: string = " ";
    private spaceBetwMorseWords: string = "\t";
    private morseDecodeDict: Object = {
        ".-": "A",
        "-.-.": "C",
        ".": "E",
        "--.": "G",
        "..": "I",
        "-.-": "K",
        "--": "M",
        "---": "O",
        "--.-": "Q",
        "...": "S",
        "..-": "U",
        ".--": "W",
        "-.--": "Y",
        "-----": "0",
        "..---": "2",
        "....-": "4",
        "-....": "6",
        "---..": "8",
        ".-.-.-": ".",
        "--..--": ",",
        "-...": "B",
        "-..": "D",
        "..-.": "F",
        "....": "H",
        ".---": "J",
        ".-..": "L",
        "-.": "N",
        ".--.": "P",
        ".-.": "R",
        "-": "T",
        "...-": "V",
        "-..-": "X",
        "--..": "Z",
        ".----": "1",
        "...--": "3",
        ".....": "5",
        "--...": "7",
        "----.": "9",
    };

    public constructor() {
        // nothing to do here
    }

    private decodeMorseLetter(morseLetter: string): string {
        return this.morseDecodeDict[morseLetter];
    }

    private decodeMorseWord(morseWord: string): string {
        let morseLetters: Array<string> = morseWord.split(
            this.spaceBetwMorseLetters
        );
        let englishLetters: Array<string> = morseLetters.map((letter: string) => {
            return this.decodeMorseLetter(letter);
        });
        let englishWord: string = englishLetters.join("");
        return englishWord;
    }

    public decodeMessage(morseMessage: string): string {
        let morseWords: Array<string> = morseMessage.split(
            this.spaceBetwMorseWords
        );
        let englishWords: Array<string> = morseWords.map((word: string) => {
            return this.decodeMorseWord(word);
        });
        let englishSentence = englishWords.join(" ");
        return englishSentence;
    }
}

export default MorseDecoder;
