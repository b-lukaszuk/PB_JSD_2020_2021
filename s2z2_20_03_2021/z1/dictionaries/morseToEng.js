"use strict";
// simple morse code chart (to copy-paste)
// http://www.csgnetwork.com/morsecodechrtbl.html
// note: it does not include all engl letters (e.g. those that come from french)
// or special characters
exports.__esModule = true;
exports.morseToEng = void 0;
// https://en.wikipedia.org/wiki/File:International_Morse_Code.svg
// 1) the lenght of a dot is one unit
// 2) a dash is three units
// 3) The space between the parts of the same letter is one unit
// 4) The space between letters is three units
// 5) The space between words is seven units
// in my code (for morse code):
// no space between the parts of the same letter
// space between letters is 1 space character
// space between words is 1 tab character
var morseToEng = {
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
    "sourceWordsSep": "\t",
    "sourceLettersSep": " ",
    "targetWordsSep": " ",
    "targetLettersSep": ""
};
exports.morseToEng = morseToEng;
