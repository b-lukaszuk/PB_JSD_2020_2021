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
var MorseDecoder = /** @class */ (function () {
    function MorseDecoder() {
        // in my morse coding code (see MorseCoder class):
        // space between letters is 1 space character
        // space between words is 1 tab character
        this.spaceBetwMorseLetters = " ";
        this.spaceBetwMorseWords = "\t";
        this.morseDecodeDict = {
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
            "----.": "9"
        };
        // nothing to do here
    }
    MorseDecoder.prototype.decodeMorseLetter = function (morseLetter) {
        return this.morseDecodeDict[morseLetter];
    };
    MorseDecoder.prototype.decodeMorseWord = function (morseWord) {
        var _this = this;
        var morseLetters = morseWord.split(this.spaceBetwMorseLetters);
        var englishLetters = morseLetters.map(function (letter) {
            return _this.decodeMorseLetter(letter);
        });
        var englishWord = englishLetters.join("");
        return englishWord;
    };
    MorseDecoder.prototype.decodeMessage = function (morseMessage) {
        var _this = this;
        var morseWords = morseMessage.split(this.spaceBetwMorseWords);
        var englishWords = morseWords.map(function (word) {
            return _this.decodeMorseWord(word);
        });
        var englishSentence = englishWords.join(" ");
        return englishSentence;
    };
    return MorseDecoder;
}());
exports["default"] = MorseDecoder;
