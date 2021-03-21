"use strict";
// simple morse code chart (to copy-paste)
// http://www.csgnetwork.com/morsecodechrtbl.html
// note: it does not include all engl letters (e.g. those that come from french)
exports.__esModule = true;
// https://en.wikipedia.org/wiki/File:International_Morse_Code.svg
// 1) the lenght of a dot is one unit
// 2) a dash is three units
// 3) The space between the parts of the same letter is one unit
// 4) The space between letters is three units
// 5) The space between words is seven units
var MorseCoder = /** @class */ (function () {
    function MorseCoder() {
        // in my code:
        // space between letters is 1 space character
        // space between words is 1 tab character
        this.spaceBetwMorseLetters = " ";
        this.spaceBetwMorseWords = "\t";
        this.morseCodeDict = {
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
            "9": "----."
        };
        // nothing to do here
    }
    MorseCoder.prototype.codeLetter = function (englishLetter) {
        return this.morseCodeDict[englishLetter.toUpperCase()];
    };
    MorseCoder.prototype.codeWord = function (englishWord) {
        var _this = this;
        var englishLetters = englishWord.split("");
        var morseLetters = englishLetters.map(function (letter) {
            return _this.codeLetter(letter);
        });
        var morseWord = morseLetters.join(this.spaceBetwMorseLetters);
        return morseWord;
    };
    MorseCoder.prototype.codeMessage = function (message) {
        var _this = this;
        var englishWords = message.split(" ");
        var morseWords = englishWords.map(function (word) {
            return _this.codeWord(word);
        });
        var morseMessage = morseWords.join(this.spaceBetwMorseWords);
        return morseMessage;
    };
    return MorseCoder;
}());
exports["default"] = MorseCoder;
