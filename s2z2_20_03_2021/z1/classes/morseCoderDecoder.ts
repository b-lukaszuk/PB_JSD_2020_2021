// simple morse code chart (to copy-paste)
// http://www.csgnetwork.com/morsecodechrtbl.html
// note: it does not include all engl letters (e.g. those that come from french)
// or special characters

// https://en.wikipedia.org/wiki/File:International_Morse_Code.svg
// 1) the lenght of a dot is one unit
// 2) a dash is three units
// 3) The space between the parts of the same letter is one unit
// 4) The space between letters is three units
// 5) The space between words is seven units

// in my code (for morse code):
// space between letters is 1 space character
// space between words is 1 tab character

class MorseCoderDecoder {
    // key-value pairs: {"sourceLetter": "targetLetter"}
    // also fields: sourceWordsSep, sourceLettersSep,
    // targetWordsSep, targetLettersSep
    private dict: Object;

    /**
     * requires dictionary for coding-decoding
     * @param {Object} dict dictionary, e.g. {"A": ".-", "C": "-.-.", etc.}
     * key-value pairs: {"sourceLetter": "targetLetter"}
     * also fields: sourceWordsSep, sourceLettersSep,
     * targetWordsSep, targetLettersSep
     */
    public constructor(dict: Object) {
        this.dict = dict;
    }

    private codeLetter(rawLetter: string): string {
        return this.dict[rawLetter.toUpperCase()];
    }

    private codeWord(
        rawWord: string,
        rawLettersSep: string = this.dict["sourceLettersSep"],
        codedLettersSep: string = this.dict["targetLettersSep"]
    ): string {
        let rawLetters: Array<string> = rawWord.split(rawLettersSep);
        let codedLetters: Array<string> = rawLetters.map((letter: string) => {
            return this.codeLetter(letter);
        });
        let codedWord: string = codedLetters.join(codedLettersSep);
        return codedWord;
    }

    private codeMessage(
        rawMessage: string,
        rawWordsSep: string = this.dict["sourceWordsSep"],
        codedWordsSep: string = this.dict["targetWordsSep"],
        rawLettersSep: string = this.dict["sourceLettersSep"],
        codedLettersSep: string = this.dict["targetLettersSep"]
    ): string {
        let rawWords: Array<string> = rawMessage.split(rawWordsSep);
        let codedWords: Array<string> = rawWords.map((word: string) => {
            return this.codeWord(word, rawLettersSep, codedLettersSep);
        });
        let codedMessage: string = codedWords.join(codedWordsSep);
        return codedMessage;
    }

    public translateMsg(rawMsg: string): string {
        return this.codeMessage(rawMsg);
    }
}

export default MorseCoderDecoder;
